
export function convertMinsToSecs(mmss){
    if(mmss != undefined){
        let mins = mmss.substring(0,2);
        let secs = mmss.substring(3,5);

        return (parseInt(mins)*60 + parseInt(secs));
    }
}

export function convertHoursToSecs(hhmmss){
    if(hhmmss != undefined){
        const [hours, minutes, seconds] = hhmmss.split(':');
        return (hours * 3600 + minutes*60 + seconds)
    }
}


export function convertSecsToMins(s){
    let mins = parseInt(s/60)
    let secs = s%60

    return (mins<10 ? '0' + parseInt(mins) : parseInt(mins)) + ':' + (secs<10 ? '0' + parseInt(secs) : parseInt(secs))
}

export function convertSecsToHours(s){
    let hours = Math.floor(s / 3600);
    let minutes = Math.floor((s - (hours * 3600)) / 60);
    let seconds = s - (hours * 3600) - (minutes * 60);
    let timeString = hours.toString().padStart(2, '0') + ':' + 
          minutes.toString().padStart(2, '0') + ':' + 
          seconds.toString().padStart(2, '0');
    return (timeString)
}

