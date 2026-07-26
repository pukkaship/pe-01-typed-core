# @pukkaship-exercise
#
# Bug 3 (planted, discovery): load_meals swallows every read failure.
# If read_source raises, the except clause catches it and returns [] as if
# zero meals loaded successfully. The caller has no way to distinguish
# "loaded zero" from "failed to load."
#
# Fix: remove the except clause so failures from read_source propagate to the caller.

from __future__ import annotations

import json
from typing import Callable, List

from src.models import Meal


def load_meals(read_source: Callable[[], str]) -> List[Meal]:
    # Bug 3 planted: swallows any exception and returns empty list.
    try:
        raw = read_source()
        data = json.loads(raw)
        return [
            Meal(
                name=row["name"],
                carb_score=row["carb_score"],
                protein_score=row["protein_score"],
                fibre_score=row["fibre_score"],
            )
            for row in data
        ]
    except Exception:
        return []
