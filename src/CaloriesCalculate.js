export function getCalories(paceInSeconds, weightKg, durationHours, strokeType = null) {
    const strokes = {
        freestyle: { slowestMET: 5.8, fastestMET: 10 },
        breaststroke: { slowestMET: 5.3, fastestMET: 9.8 },
        butterfly: { slowestMET: 8.3, fastestMET: 13.8 },
        backstroke: { slowestMET: 4.8, fastestMET: 9.5 },
        average: { slowestMET: 6, fastestMET: 10.8 }
    };

    const slowestPace = 180, fastestPace = 60; // seconds per 100m
    const stroke = strokes[strokeType?.toLowerCase()] || strokes.average;

    let MET;
    if (paceInSeconds <= fastestPace) {
        MET = stroke.fastestMET;
    } else {
        const normalizedPace = Math.min(paceInSeconds, slowestPace);
        let baseMET = stroke.slowestMET + (stroke.fastestMET - stroke.slowestMET) * Math.pow((slowestPace - normalizedPace) / (slowestPace - fastestPace), 1.2);

        // Decrease MET further if pace slower than slowestPace
        if (paceInSeconds > slowestPace) {
            const extraSlowFactor = 0.01; // tweak this number if needed
            baseMET -= (paceInSeconds - slowestPace) * extraSlowFactor;
        }

        MET = Math.max(baseMET, 1); // never let it drop below 1 MET
    }

    return MET * weightKg * durationHours;
}
