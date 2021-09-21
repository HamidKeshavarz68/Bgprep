class CUtils {
    static pCountryData=null;
    static pTranslateTable=null;
    //--------------------------------------------------------------------------------
    static FormatFPower(val){
        let valNum = Number(val);
        let po="Mb"
        if (valNum > 1000000){
            valNum=valNum/1000000;
            po="Tb"
        } else if (valNum > 1000) {
            valNum=valNum/1000;
            po="Gb"
        } 

        valNum = Math.ceil(valNum)
        return (valNum + " " + po);
    }
    //--------------------------------------------------------------------------------
    static FormatLongString(val,maxSize){
        if (val.length <  maxSize){
            return val;
        } 
        
        val=val.slice(0,maxSize)
        return val+"..."
    }
    //--------------------------------------------------------------------------------
    static GetSafetyScoreColor(vn){
        let backgroundColor="green";
        let color="white"
        if (vn > 6 ){
            backgroundColor="green";
        } else if(vn > 4) {
            backgroundColor="blue";
        } else if(vn > 2) {
            backgroundColor="yellow";
            color="black";
        } else if(vn > 1) {
            backgroundColor="orange";
            color="black";
        } else {
            backgroundColor="red";
        }
        return {backgroundColor:backgroundColor,color:color};
    }
    //--------------------------------------------------------------------------------
    static GetCatLabel(cat){
        if(CUtils.pTranslateTable==null){
            CUtils.translateTable={}
            CUtils.translateTable["ad-servers"]="AD Servers"
            CUtils.translateTable["open-proxy"]="Open Proxy"
            CUtils.translateTable["open-access"]="Open Access"
            CUtils.translateTable["gray-list"]="Gray List"
            CUtils.translateTable["tor"]="Tor"
            CUtils.translateTable["spammer"]="Spammer"
            CUtils.translateTable["harvesters"]="Harvesters"
            CUtils.translateTable["miner"]="Miner"
            CUtils.translateTable["child_pornography_share"]="Child Sex Abuse Material"
            CUtils.translateTable["black-list"]="Black List"
        }

        return  CUtils.translateTable[cat];
    }
    //--------------------------------------------------------------------------------
    static GetCountryNameByID(id){
        if (CUtils.pCountryData===null) {
            const data = require('./base/data/code.json');
            CUtils.pCountryData={}
            for(let obj of data){
                CUtils.pCountryData[obj.code]=obj.name;
            }
        }

        id=id.toUpperCase();
        let name=CUtils.pCountryData[id]
        if (name===undefined){
            return id
        }
        return CUtils.FormatLongString(name,15)
    }
    //--------------------------------------------------------------------------------
}

export default CUtils;