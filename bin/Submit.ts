import axios from "axios";
import registerData from "@/interface/registerData";

async function submitKey(key: string) {
    const keySite = "https://www.chsi.com.cn/xlcx/bg.do?vcode=" + key;
    let data = "";
    let reg = /\"label\"\>(.*?)<.*?\">(.*?)\</g;
    let registerDataJson: Record<string, string> = {};

    await axios
        .get("https://cors-anywhere.herokuapp.com/" + keySite, { headers: { "X-Requested-With": "XMLHttpRequest" } })
        .then((response) => {
            data = response.data;
            data = data.replace(/[\r\n]/g, "");
            let result: RegExpExecArray | null;
            while ((result = reg.exec(data)) != null) {
                registerDataJson[result[1]] = result[2];
            }
        })
        .catch((error) => {
            console.log(error);
        });

    let register: registerData = {
        name: registerDataJson["姓名"],
        sex: registerDataJson["性别"],
        nationality: registerDataJson["民族"],
        college: registerDataJson["院校"],
        level: registerDataJson["层次"],
        profession: registerDataJson["专业"],
    };

    return register;
}

export default submitKey;
