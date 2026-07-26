# @pukkaship-exercise
#
# Bug 1 (planted, mypy): Meal and ScorerResult exist but are not declared as
# @dataclass with typed fields. score_meal and load_meals are also unannotated.
# mypy --strict fails on disallow_untyped_defs / Any.
#
# Fix: convert Meal and ScorerResult to @dataclass with typed int/str fields,
# annotate all functions, and keep mypy --strict clean.
# The moment you do, mypy will reveal a second class of defect — see scorer.py.


class Meal:
    def __init__(self, name, carb_score, protein_score, fibre_score):
        self.name = name
        self.carb_score = carb_score
        self.protein_score = protein_score
        self.fibre_score = fibre_score


class ScorerResult:
    def __init__(self, score, signal):
        self.score = score
        self.signal = signal
