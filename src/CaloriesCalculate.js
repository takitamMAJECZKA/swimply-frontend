export default function getCalories(paceInSeconds, weightKg, durationHours, strokeType = null, equipment = []) {
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
    if (paceInSeconds === fastestPace) {
        MET = stroke.fastestMET;
    } else if (paceInSeconds > fastestPace) {
        const normalizedPace = Math.min(paceInSeconds, slowestPace);
        let baseMET = stroke.slowestMET + (stroke.fastestMET - stroke.slowestMET) * Math.pow((slowestPace - normalizedPace) / (slowestPace - fastestPace), 1.2);

        if (paceInSeconds > slowestPace) {
            const extraSlowFactor = 0.01;
            baseMET -= (paceInSeconds - slowestPace) * extraSlowFactor;
        }

        MET = Math.max(baseMET, 1);
    } else {
        // Faster than fastestPace → increase MET
        const extraFastFactor = 0.02; // adjust how strong the boost is
        MET = stroke.fastestMET + (fastestPace - paceInSeconds) * extraFastFactor;
    }

    // Adjust for equipment
    const equipmentPenalty = {
        kickboard: 0.95,
        handpaddles: 0.92,
        fins: 0.9,
        monofin: 0.88,
        pullbuoy: 0.93,
        snorkel: 0.97,
        noodle: 0.94
    };

    equipment.forEach(item => {
        const penalty = equipmentPenalty[item.toLowerCase()];
        if (penalty) {
            MET *= penalty;
        }
    });
    return MET * weightKg * durationHours;
}
