var envdata = datajsa.concat(datajsb)
// if i declare inputPcd outside, can use it somewhere else!!
var inputPcd

var clickGO = document.getElementById('btn-pcd')

function testDefine(){
    if (typeof(pcdrisk) === 'undefined'){
        console.log('first run')
        getInputPcd()
    }else{
        
        //remove layer
        if(map.hasLayer(pcdbuff)){
            map.removeLayer(pcdbuff);
            map.removeLayer(pcdpt);
        }
        
        //reset legend 
        
        var spans = document.querySelectorAll("td:nth-child(2) span")
        for (i=0; i< spans.length; i++){
            spans[i].style.borderColor="white"
        }

        var td4 = document.querySelectorAll("td:nth-child(4) span")
        for (i=0; i< td4.length; i++){
            td4[i].textContent = ""
        }

        console.log('del data')

        //run code again
        console.log('run code again')
        getInputPcd()
    }
}

function getInputPcd(){

    // Selecting the input element and get its value 
    var inputPcd = document.getElementById("myPcd").value;
    console.log(inputPcd);

    //process data into all caps and no space
    var inputPcd_ns = inputPcd.replace(/\s+/g,'').toUpperCase()


    pcdrisk = matchPcd(inputPcd_ns);
    displayPcd(pcdrisk);
    displayLegend(pcdrisk);
    }

function matchPcd(I_pcd){
    var risk = envdata.filter( record => record.pcd_ns === I_pcd)
    if( typeof risk[0] === 'undefined'){
        alert('Please give another Postcode within London');
        
    }
    else {
        
        return risk
    }
    }

function buffPcd(lng,lat){
    var point = turf.point([lng,lat]);
    var dist = 200;
    var buffered = turf.buffer(point, dist, {units: 'meters'})
    return buffered
    };

var buffStyle = {
    //"color": '#FFFFFF',
    "color": 'white',
    "weight": 3,
    "dashArray": 15,
    "fill": false
    };

//another function to take latlong and display on the map 
//**use turf to create buffer
// zoom to map
function displayPcd(risk){
    
    //map.removeLayer(pcdpt)
    var pcdlat = Number(risk[0].lat)
    var pcdlng = Number(risk[0].long)

    pcdpt = L.marker([pcdlat,pcdlng]).addTo(map);

    var pcdbuff_gjs = buffPcd(pcdlng,pcdlat)



    //create pane
    map.createPane('paneBuff');
    map.getPane('paneBuff').style.zIndex = 700;

    pcdbuff = L.geoJSON(pcdbuff_gjs, {
        style: buffStyle,
        pane: 'paneBuff'
    }).addTo(map);
    //pcdbuff.bringToFront();
    
    //set view 17 or 16
    map.setView(pcdpt._latlng, 16.5)
    }

function displayLegend(risk){
    var Air_PM25 = Number(risk[0].Air_PM25_RC_maj)
    var Air_PM10 = Number(risk[0].Air_PM10d_RC_maj)
    var Air_NO2 = Number(risk[0].Air_NO2_RC_maj)
    var Flood = Number(risk[0].Flood_RC_maj)
    var Heat = Number(risk[0].Heat_RC_maj)
    var Noise = Math.round(Number(risk[0].Noise_RC_avg))

    var Air_PM25_avg = Math.round(Number(risk[0].Air_PM25_C_avg))
    var Air_PM10d_avg = Math.round(Number(risk[0].Air_PM10d_C_avg))
    var Air_NO2_avg = Math.round(Number(risk[0].Air_NO2_C_avg))
    //var Noise_avg = Math.round(Number(risk[0].Noise_RC_avg))

    var Flood_tx = ['no risk','<0.1%','0.1-1%','1-3.3%','>3.3%']
    var Heat_tx = ['14','15','16','17', '18']
    var Noise_tx = ['no risk', '50', '60', '70','80']

    var Flood_avg = Flood_tx[Flood-1]
    var Heat_avg = Heat_tx[Heat-1]
    var Noise_avg = Noise_tx[Noise-1]
    

    // change colors
    var pm25_box = "v1"+Air_PM25
    document.getElementById(pm25_box).style.borderColor = "grey";

    var pm10_box = "v2"+Air_PM10
    document.getElementById(pm10_box).style.borderColor = "grey";

    var no2_box = "v3"+Air_NO2
    document.getElementById(no2_box).style.borderColor = "grey";

    var flood_box = "v4"+Flood
    document.getElementById(flood_box).style.borderColor = "grey";

    var heat_box = "v5"+Heat
    document.getElementById(heat_box).style.borderColor = "grey";

    var noise_box = "v6"+Noise
    document.getElementById(noise_box).style.borderColor = "grey";

    //Add text
    document.getElementById("v17").textContent = Air_PM25_avg
    document.getElementById("v27").textContent = Air_PM10d_avg
    document.getElementById("v37").textContent = Air_NO2_avg

    document.getElementById("v47").textContent = Flood_avg
    document.getElementById("v57").textContent = Heat_avg 
    document.getElementById("v67").textContent = Noise_avg

    }

var returnPcd = clickGO.addEventListener("click", testDefine)
