# Day 1 — How we use AI on this project

You'll use Cursor (or whatever AI coding tool you prefer) throughout this program. Before your
first fix, three non-negotiables — the same ones a working engineering team actually holds itself
to, not classroom rules invented for this exercise.

## 1. Never code directly in chat

If the AI proposes a fix, it goes into a file you read and edit yourself — never pasted straight
from a chat window into a commit. If you can't point to the file and line where you understood
*why* the fix works, you haven't fixed the bug yet; the AI has, and you've just watched.

## 2. Files are memory, not chat history

Every message you send in a long AI chat re-sends the whole conversation so far. A long-running
chat gets slower and more expensive to reason with as it grows, and it tempts you to "just ask one
more thing" instead of writing down what you've learned. Put what matters in a file — your
`hypothesis.md`, your bug journal, a comment explaining a non-obvious fix — not in a chat you keep
alive across multiple bugs. Start a fresh chat per bug.

## 3. Red, then green — never green by accident

For every bug this week: read the failing test first, form a hypothesis about the root cause
*before* editing anything, make the smallest change that addresses that hypothesis, then confirm
the test is green for the reason you expected — not because you happened to silence the symptom.
If you can't explain why your fix makes the test pass, you don't have a fix, you have a coincidence.

## The rule for AI collaboration specifically

You may ask Cursor what an error means, or what a pattern is called. You may **not** ask it to fix
code you haven't read. At your weekly sync, you'll be asked to explain each fix without looking at
your PR — if you can't, that's a signal the fix belongs to the AI, not to you yet.

This matters more than it looks like it does this week, because every later module assumes you
already have this habit. By the time AI-generated code is doing real architectural work (starting
in a few weeks), the discipline of reading before accepting has to already be automatic.
