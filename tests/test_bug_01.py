"""Bug 1 — typed models catch wrong shapes; the static check is the first gate.

This is the only test file active when you clone the repo.
Run pytest and read the failure before changing code.

There is 1 failing test and 4 passing tests.

The failing test checks a high-carb meal's signal. Read the failure message.
That failing test is NOT the bug that caused Priya's wrong "balanced" reply.
The culprit is hiding behind a green test. Your hypothesis should name it.

Also run: mypy --strict src/
That is a separate failure. Bug 1 is the mypy gate.
"""

import pytest

from src.models import Meal, ScorerResult
from src.scorer import score_meal


def test_balanced_meal_both_dimensions() -> None:
    """A meal with both protein and fibre above threshold scores balanced."""
    meal = Meal(name="lentil soup", carb_score=3, protein_score=5, fibre_score=5)
    result = score_meal(meal)
    assert result.signal == "balanced"


def test_low_everything_needs_balance() -> None:
    """A meal low on all dimensions scores needs-balance."""
    meal = Meal(name="plain crackers", carb_score=3, protein_score=0, fibre_score=0)
    result = score_meal(meal)
    assert result.signal == "needs-balance"


def test_score_is_sum_of_three_components() -> None:
    """The score field equals the sum of carb, protein, and fibre scores."""
    meal = Meal(name="veggie omelette", carb_score=2, protein_score=2, fibre_score=3)
    result = score_meal(meal)
    assert result.score == 7


def test_medium_meal_needs_balance() -> None:
    """A medium meal not meeting either threshold scores needs-balance."""
    meal = Meal(name="grilled chicken", carb_score=1, protein_score=2, fibre_score=2)
    result = score_meal(meal)
    assert result.signal == "needs-balance"


def test_off_balance_high_carb() -> None:
    """A meal with a very high carb score should signal off-balance."""
    # This test is failing on clone. Read the failure precisely.
    # It is not the bug that caused Priya's wrong "balanced" reply.
    meal = Meal(name="white rice kheer", carb_score=9, protein_score=1, fibre_score=1)
    result = score_meal(meal)
    assert result.signal == "off-balance"
