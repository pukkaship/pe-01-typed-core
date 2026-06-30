# Reflection — the one idea

Fill this in after you have fixed all five bugs. CI checks it is at least 30 words.

> This file replaces the old habit of burying a reflection inside a source comment.
> Reasoning belongs in prose, next to the code — not hidden in a regex-matched comment.

## The production story, in your own words

A real service once sent every reply and recorded none of them through a side path; another
read a state flag that no code ever wrote. The lesson became two rules:
**nothing leaves without being recorded, and anything the system reads, something must write.**

## Connect the story to this week's bugs (write 1–2 paragraphs)

Explain how **Bug 3** (the swallowed async error) and **Bug 5** (the process that exits 0 on
failure) are the same pattern as the story above: a system that *appears* to succeed while
silently doing the wrong thing. What is the general rule that ties all five bugs together?

[your reflection here]
