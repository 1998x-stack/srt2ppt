#!/usr/bin/env python3
"""Parse SRT subtitle files into clean, readable text.

Usage:
    python3 parse_srt.py <input.srt>              # print to stdout
    python3 parse_srt.py <input.srt> -o out.txt   # save to file
    python3 parse_srt.py <input.srt> --json       # output structured JSON
"""

import re, json, sys, argparse
from pathlib import Path


def parse_srt(filepath: str) -> list[dict]:
    """Parse an SRT file, return list of {index, start, end, text} dicts."""
    with open(filepath, encoding="utf-8") as f:
        raw = f.read()

    # Split into subtitle blocks (double newline)
    blocks = re.split(r"\n\n+", raw.strip())
    entries = []

    for block in blocks:
        lines = block.strip().split("\n")
        if len(lines) < 2:
            continue

        # Line 0: index (integer)
        try:
            index = int(lines[0].strip())
        except ValueError:
            continue

        # Line 1: timestamp "00:00:06,490 --> 00:00:08,330"
        ts_match = re.match(
            r"(\d{2}:\d{2}:\d{2},\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2},\d{3})",
            lines[1],
        )
        if not ts_match:
            continue

        # Remaining lines: subtitle text
        text = "".join(lines[2:]).strip()

        # Remove TurboScribe watermark
        text = re.sub(r"\(?Transcribed by TurboScribe[^)]*\)?\.?\s*", "", text)

        if text:
            entries.append(
                {"index": index, "start": ts_match.group(1), "end": ts_match.group(2), "text": text}
            )

    return entries


def merge_text(entries: list[dict], max_gap_ms: int = 1500) -> list[dict]:
    """Merge consecutive entries into paragraphs when the gap is small."""
    if not entries:
        return []

    def ts_to_ms(ts: str) -> int:
        h, m, s = ts.split(":")
        sec, ms = s.split(",")
        return int(h) * 3600000 + int(m) * 60000 + int(sec) * 1000 + int(ms)

    paragraphs = []
    current = {"start": entries[0]["start"], "text": entries[0]["text"]}

    for i in range(1, len(entries)):
        prev_end = ts_to_ms(entries[i - 1]["end"])
        curr_start = ts_to_ms(entries[i]["start"])
        gap = curr_start - prev_end

        if gap <= max_gap_ms:
            # Merge: append text with appropriate joining
            prev_text = current["text"]
            curr_text = entries[i]["text"]
            # If previous ends with punctuation, add space; otherwise join directly
            if prev_text.rstrip()[-1] in "，。！？；：、" if prev_text.rstrip() else False:
                current["text"] = prev_text + curr_text
            else:
                current["text"] = prev_text + curr_text
        else:
            # New paragraph
            current["end"] = entries[i - 1]["end"]
            paragraphs.append(current)
            current = {"start": entries[i]["start"], "text": entries[i]["text"]}

    current["end"] = entries[-1]["end"]
    paragraphs.append(current)
    return paragraphs


def to_plain_text(paragraphs: list[dict]) -> str:
    """Convert merged paragraphs to plain readable text."""
    lines = []
    for p in paragraphs:
        # Clean up: normalize punctuation, remove extra spaces
        text = p["text"]
        text = text.replace(",,", "，").replace("  ", " ")
        lines.append(text)
    return "\n\n".join(lines)


def to_json_output(paragraphs: list[dict]) -> str:
    """Convert to JSON with timing metadata."""
    return json.dumps(
        [
            {
                "paragraph": i + 1,
                "time": f"{p['start']} --> {p.get('end', '?')}",
                "text": p["text"],
            }
            for i, p in enumerate(paragraphs)
        ],
        ensure_ascii=False,
        indent=2,
    )


def main():
    parser = argparse.ArgumentParser(description="Parse SRT subtitle files into clean text")
    parser.add_argument("input", help="Path to .srt file")
    parser.add_argument("-o", "--output", help="Output file path (default: stdout)")
    parser.add_argument("--json", action="store_true", help="Output structured JSON")
    parser.add_argument(
        "--gap", type=int, default=1500, help="Max gap (ms) to merge entries (default: 1500)"
    )
    parser.add_argument(
        "--no-merge", action="store_true", help="Don't merge entries, output each subtitle separately"
    )
    args = parser.parse_args()

    entries = parse_srt(args.input)
    if not entries:
        print(f"Error: No valid SRT entries found in {args.input}", file=sys.stderr)
        sys.exit(1)

    if args.no_merge:
        paragraphs = [
            {"start": e["start"], "end": e["end"], "text": e["text"]} for e in entries
        ]
    else:
        paragraphs = merge_text(entries, max_gap_ms=args.gap)

    if args.json:
        output = to_json_output(paragraphs)
    else:
        output = to_plain_text(paragraphs)

    if args.output:
        Path(args.output).write_text(output, encoding="utf-8")
        print(f"Parsed {len(entries)} entries → {len(paragraphs)} paragraphs → {args.output}", file=sys.stderr)
    else:
        print(output)


if __name__ == "__main__":
    main()
