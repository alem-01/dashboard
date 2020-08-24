export const toSize = size => {
    const e = (Math.log(size) / Math.log(1024)) | 0;
    const unit = "KMGTPEZY"[e - 1] || "";
    const num = size / Math.pow(1024, e);
    const round = Math.round(num);
    return `${round > 100 ? round : num.toFixed(round > 10 ? 1 : 2)}${unit}B`;
};

export const getGradeColor = xp => {
    const grade = xp / maxXP;
    if (grade >= 0.8) return "hsl(185, 100%, 50%)";
    if (grade >= 0.6) return "hsl(170, 100%, 35%)";
    if (grade >= 0.4) return "hsl(60, 100%, 50%)";
    if (grade >= 0.2) return "hsl(35, 100%, 50%)";
    return "hsl(340, 100%, 60%)";
};