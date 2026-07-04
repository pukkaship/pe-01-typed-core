# Day 1 — Game Round 0 (warm-up)

Separately from Nudge's own bugs, the founder occasionally forwards you a problem from someone
else's startup — a different business each time, so the judgment you build has to transfer, not
just apply to Nudge's own code. This is the first, lowest-stakes round: no build, no formal review
structure yet, just a warm-up for the kind of thinking the rest of the program will ask of you.

## The problem

> "A friend of mine is building a basic booking system — customers reserve a time slot with a
> provider (a haircut, a consultation, whatever). She asked me to sanity-check the API before her
> team starts building. Take a look and tell her what you'd flag."

## What to actually do

Spend 15–20 minutes. No code, no repo, nothing to submit or push. Sketch (on paper, in a doc,
out loud to a friend — your choice) answers to:

1. What are the resources? (A booking? A provider? A time slot? Something else?)
2. What are the routes, roughly? (`POST /bookings`? `GET /providers/:id/availability`? name a few)
3. Where's the trust boundary? Who's allowed to book, cancel, or see whose bookings?
4. Name one way this could go wrong that has nothing to do with the code being buggy — a design
   choice that's technically correct but will bite someone later (a double-booking race? a
   provider seeing another provider's schedule? something else?)

## Why this is ungraded

You don't have the vocabulary yet for a real design review — that comes later, piece by piece, as
each module introduces a new lens on architecture. This round exists to notice, for yourself,
what you already think to ask *before* anyone hands you a framework for asking it. Compare your
own notes against your instincts again later in the program and see what's changed.

There's no submission for this one. Move on to `hypothesis.md` when you're ready.
