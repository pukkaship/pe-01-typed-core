# Day 1 — The story behind every bug

> ▶ Watch the 5-minute orientation video before reading this. The phrase you need for
> `hypothesis.md` is in it.

## A team that built fast

A small team shipped an AI product quickly. Features went out weekly. To move fast, they wired
things up wherever it was convenient: one part of the system sent messages to users from here,
another part sent them from there, and a third had its own little shortcut. Every path worked in
the demo. Everyone was optimistic.

## The ledger that could not see

Then finance asked a simple question: *how many messages did we send last month?* Nobody could
answer. Most messages were recorded — but one of those convenient shortcuts sent messages through
a side door that wrote nothing down. The ledger was confidently wrong, because it could only count
what it could see, and an entire path was invisible to it.

## The memory that was never written

Worse, a piece of code read a status flag to decide what to do next — but no code anywhere ever
*set* that flag. It had been added by someone who assumed someone else would write it. The reader
existed; the writer never did. So the system quietly took the wrong branch, forever, and no error
was ever raised.

## Two rules

These two failures gave the team two rules they now apply everywhere:

1. **Nothing leaves without being recorded, and there is only one door.**
2. **Anything the system reads, something must write.**

## Why this matters for Module 1

The five bugs in this repo are small, local versions of those same failures: a function that
*looks* like it works but silently returns the wrong thing; an error that vanishes; a process that
reports success while doing nothing. The single idea this week is **fail loud** — when something is
wrong, the system should *say so*, not return `undefined` and carry on.

You will see these patterns again, in different forms, in every module of this program.
