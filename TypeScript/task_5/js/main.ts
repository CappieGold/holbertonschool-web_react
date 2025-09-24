export interface MajorCredits {
  credits: number;
  readonly __brand: "MajorCredits";
}

export interface MinorCredits {
  credits: number;
  readonly __brand: "MinorCredits";
}

export function makeMajorCredits(credits: number): MajorCredits {
  return { credits, __brand: "MajorCredits" };
}

export function makeMinorCredits(credits: number): MinorCredits {
  return { credits, __brand: "MinorCredits" };
}

export function sumMajorCredits(
  subject1: MajorCredits,
  subject2: MajorCredits
): MajorCredits {
  return makeMajorCredits(subject1.credits + subject2.credits);
}

export function sumMinorCredits(
  subject1: MinorCredits,
  subject2: MinorCredits
): MinorCredits {
  return makeMinorCredits(subject1.credits + subject2.credits);
}

// Personal test
const m1 = makeMajorCredits(3);
const m2 = makeMajorCredits(5);
const totalMajor = sumMajorCredits(m1, m2);
console.log("Major:", totalMajor.credits);

const n1 = makeMinorCredits(2);
const n2 = makeMinorCredits(4);
const totalMinor = sumMinorCredits(n1, n2);
console.log("Minor:", totalMinor.credits);
