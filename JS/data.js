async function getData(){

  const jsondata2 = await fetch('https://data.covid19india.org/data.json');
  const jsdata2 = await jsondata2.json();
  const dataforchart = jsdata2.statewise;
  const size = Object.keys(dataforchart).length;

  const jsondata3 = await fetch('https://data.covid19india.org/v4/min/data.min.json');
  const dataj = await jsondata3.json();
  dataforchart.splice(30, 1);

  const dis = dataj['OR'].districts;
  const lengdist = Object.keys(dis).length;
  var districts = ['Angul','Balangir','Balasore', 'Bargarh','Bhadrak','Boudh','Cuttack','Deogarh','Dhenkanal','Gajapati',
  'Ganjam','Jagatsinghpur','Jajpur','Jharsuguda','Kalahandi',
  'Kandhamal','Kendrapara','Kendujhar','Khordha','Koraput',
  'Malkangiri','Mayurbhanj','Nabarangapur','Nayagarh',
  'Nuapada','Puri','Rayagada','Sambalpur','Subarnapur','Sundargarh']

var active;

const odisha = document.getElementById('odisha');
for(var i=0;i<lengdist;i++)
{
if( dis[districts[i]].delta != null)
{

var conf = dis[districts[i]].total.confirmed;
var rec = dis[districts[i]].total.recovered;
var deathsdistric =  dis[districts[i]].total.deceased;
active=(conf-(rec+deathsdistric));
if(isNaN(active)==true)
{
  active='-';
}

  if(dis[districts[i]].delta.deceased == null)
  {
   
      dis[districts[i]].delta.deceased=0;
  }

  if(dis[districts[i]].delta.tested == null)
  {
   
      dis[districts[i]].delta.tested=0;
  }
  if(dis[districts[i]].delta.recovered == null)
  {
   
      dis[districts[i]].delta.recovered=0;
  }

  if(dis[districts[i]].delta.vaccinated == null)
  {
   
      dis[districts[i]].delta.vaccinated=0;
  }
 
  var template = `<tr class="tablerow">
                   <td class="fixedright color">${districts[i]}</td>
                   <td class="dataletterspacing" > <span class="delta-confirmed"><i class="fas fa-arrow-up"></i>${dis[districts[i]]?.delta?.confirmed?.toLocaleString('en-IN') ?? 0}</span><br>${dis[districts[i]].total.confirmed.toLocaleString('en-IN')}</td>
                   <td class="dataletterspacing"> ${active}</td>
                   <td class="dataletterspacing"> <span class="delta-confirmed recovered"><i class="fas fa-arrow-up"></i>${dis[districts[i]]?.delta?.recovered.toLocaleString('en-IN') ?? 0}</span><br>${dis[districts[i]].total.recovered.toLocaleString('en-IN')}</td>
                   <td class="dataletterspacing"> <span class="delta-confirmed deaths"><i class="fas fa-arrow-up"></i>${dis[districts[i]]?.delta?.deceased.toLocaleString('en-IN') ?? 0}</span><br>${dis[districts[i]].total.deceased.toLocaleString('en-IN')}</td>
                   <td class="dataletterspacing"> <span class="delta-confirmed vaccinated"><i class="fas fa-arrow-up"></i>${numDifferentiation(dis[districts[i]]?.delta?.vaccinated1 ?? 0)}</span><br>${numDifferentiation(dis[districts[i]].total.vaccinated1)}</td>
                   <td class="dataletterspacing"> <span class="delta-confirmed vaccinated"><i class="fas fa-arrow-up"></i>${numDifferentiation(dis[districts[i]]?.delta?.vaccinated2 ?? 0)}</span><br>${numDifferentiation(dis[districts[i]].total.vaccinated2)}</td>
                   <td class="dataletterspacing">${numDifferentiation(dis[districts[i]]?.total?.tested ?? "NA")}</td>
                   <td class="dataletterspacing"> ${numDifferentiation(dis[districts[i]]?.meta?.population ?? "NA")}</td>
  </tr>`
  odisha.innerHTML += template;
}
else {

var conf = dis[districts[i]].total.confirmed;
var rec = dis[districts[i]].total.recovered;
var deathsdistric = dis[districts[i]].total.deceased;
active=((conf)-(rec+ deathsdistric));
// console.log(active);
var template = `<tr class="tablerow">
              
<td class="fixedright color">${districts[i]}</td>
<td class="dataletterspacing">${dis[districts[i]].total.confirmed.toLocaleString('en-IN')}</td>
<td class="dataletterspacing">${active.toLocaleString('en-IN')}</td>
<td class="dataletterspacing">${dis[districts[i]].total.recovered.toLocaleString('en-IN')}</td>
<td class="dataletterspacing">${dis[districts[i]].total.deceased.toLocaleString('en-IN')}</td>
<td class="dataletterspacing">${numDifferentiation(dis[districts[i]].total.vaccinated1)}</td>
<td class="dataletterspacing">${numDifferentiation(dis[districts[i]].total.vaccinated2)}</td>
<td class="dataletterspacing">${numDifferentiation(dis[districts[i]].total.tested)}</td>
<td class="dataletterspacing">${numDifferentiation(dis[districts[i]].meta.population)}</td>
</tr>`
odisha.innerHTML += template;
}
}

for(var i=0;i<size;i++)
{
if(dataforchart[i].statecode=='OR')
{
 const totalconfirmed = document.getElementById('conf');
 totalconfirmed.innerText = `${dataforchart[i].confirmed.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`;

 const deltaconf = document.getElementById('deltacnf');
 deltaconf.innerText = `+${dataforchart[i].deltaconfirmed.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`;

 const totalactive = document.getElementById('active');
 totalactive.innerText = `${dataforchart[i].active.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`;

 const totalrecoverd = document.getElementById('recovered');
 totalrecoverd.innerText = `${dataforchart[i].recovered.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`;

 const deltarecov = document.getElementById('deltarecov');
 deltarecov.innerText = `+${dataforchart[i].deltarecovered.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`;

 const deaths = document.getElementById('deaths');
 deaths.innerText = `${dataforchart[i].deaths.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`;

 const deltadeaths = document.getElementById('deltadeaths');
 deltadeaths.innerText = `+${dataforchart[i].deltadeaths.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`;


}
}
}
getData();

function numDifferentiation (val) {
  if (val >= 10000000) {
    val = (val / 10000000).toFixed(1) + 'Cr';
  } else if (val >= 100000) {
    val = (val / 100000).toFixed(1) + 'L';
  }
  else if(val >= 1000) val = (val/1000).toFixed(1) + 'K';
  return val;
}