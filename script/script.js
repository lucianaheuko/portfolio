function calculate_age(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

var idade_hoje = calculate_age(new Date(1988, 8, 12));

document.getElementById('idade').innerHTML = idade_hoje;
