async function getcovidapiInf() {
    const jsondata2 = await fetch("https://api.covid19india.org/data.json");
    const jsdata2 = await jsondata2.json();
    const dataforchart = jsdata2.statewise;
    const size = Object.keys(dataforchart).length;


    for (var i = 0; i < size; i++) {
        if (dataforchart[i].statecode == "OR") {
            const totalconfirmed = document.getElementById("conf");
            totalconfirmed.innerText = `${dataforchart[i].confirmed.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`;

            const deltaconf = document.getElementById("deltacnf");
            deltaconf.innerText = `+${dataforchart[i].deltaconfirmed.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`;

            const totalactive = document.getElementById("active");
            totalactive.innerText = `${dataforchart[i].active.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`;

            const totalrecoverd = document.getElementById("recovered");
            totalrecoverd.innerText = `${dataforchart[i].recovered.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`;

            const deltarecov = document.getElementById("deltarecov");
            deltarecov.innerText = `+${dataforchart[i].deltarecovered.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`;

            const deaths = document.getElementById("deaths");
            deaths.innerText = `${dataforchart[i].deaths.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`;

            const deltadeaths = document.getElementById("deltadeaths");
            deltadeaths.innerText = `+${dataforchart[i].deltadeaths.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`;
            
        }
    }
    
}
getcovidapiInf();

