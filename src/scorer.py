# @pukkaship-exercise
#
# Two planted bugs live here. You will not see them both at once — the gate system
# reveals one failing test at a time.
#
# Bug 2 (planted): ScorerResult.signal should be Literal["balanced","needs-balance","off-balance"].
# One branch below returns "balenced" (typo). mypy accepts it (it is a str); tests that
# assert the exact verdict string will fail. Fix: narrow signal to the correct Literal type
# in models.py and correct the typo.
#
# Bug 4 (planted): compute_signal uses 'or' where 'and' is required. A meal with protein
# above the threshold but fibre below it is wrongly called "balanced". Fix: change 'or' to 'and'.
#
# Bug 5 (planted, unannounced): score_meal silently swallows non-numeric score values.
# A Meal constructed with protein_score='5' (string) is accepted at construction (@dataclass
# does not enforce types at runtime). The try/except below catches the resulting TypeError
# and returns a plausible "needs-balance" instead of surfacing an error. Fix: add an
# up-front guard that raises ValueError for any score field that is not a plain int.

from __future__ import annotations

from src.models import Meal, ScorerResult


def score_meal(meal: Meal) -> ScorerResult:
    # Bug 5 (unannounced): swallows TypeError/ValueError from bad field types.
    # Remove this try/except and add an explicit type guard before using the fields.
    try:
        signal = _compute_signal(meal)
        total = meal.carb_score + meal.protein_score + meal.fibre_score
        return ScorerResult(score=total, signal=signal)
    except (TypeError, ValueError):
        return ScorerResult(score=0, signal="needs-balance")


def _compute_signal(meal: Meal) -> str:
    protein_ok = meal.protein_score >= 4
    fibre_ok = meal.fibre_score >= 4

    # Bug 4 planted: 'or' should be 'and'.
    # A meal is only "balanced" when BOTH protein AND fibre meet the threshold.
    if protein_ok or fibre_ok:
        return "balanced"

    # Bug 2 planted: "balenced" is a misspelling. Correct string is "off-balance".
    if meal.carb_score >= 8 or meal.protein_score >= 8 or meal.fibre_score >= 8:
        return "balenced"

    return "needs-balance"
