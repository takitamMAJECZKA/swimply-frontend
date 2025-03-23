export function getCalories(paceInSeconds, weightKg, paceInSeconds, durationHours) {
    // Updated pace-MET range
    const slowestPace = 180, slowestMET = 3;  // 3:00 per 100m ~ 3 METs
    const fastestPace = 60, fastestMET = 12;  // 1:00 per 100m ~ 12 METs

    // Ensure pace stays within bounds
    if (paceInSeconds >= slowestPace) return slowestMET;
    if (paceInSeconds <= fastestPace) return fastestMET;

    // Adjusted formula for a smoother transition (logarithmic scaling)
    let MET = slowestMET + (fastestMET - slowestMET) * Math.pow((slowestPace - paceInSeconds) / (slowestPace - fastestPace), 1.2);
    return MET * weightKg * durationHours;
}