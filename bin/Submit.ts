interface registerData {
    // 更新日期
    updateTime: string;
    // 姓名
    name: string;
    // 性别
    sex: SexEnum;
    // 民族
    nationality: string;
    // 院校
    college: string;
    // 层次
    level: string;
    // 专业
    profession: string;
    // 在线验证码
    onlineVerificationCode: string;
}

enum SexEnum {
    MALE = "男",
    FEMALE = "女",
}

async function submitKey(key: string) {
    const keySite = "https://www.chsi.com.cn/xlcx/bg.do?vcode=" + key;

    // FIXME: No 'Access-Control-Allow-Origin' header is present on the requested resource.
    // 1.最简单粗暴的解决方法就是安装浏览器插件来处理,但不实际
    // 2.借助 cors-anywhere 暂时绕过 cors
    const response = await fetch("https://cors-anywhere.herokuapp.com/" + keySite, {
        method: "Get",
        headers: {
            "X-Requested-With": "XMLHttpRequest",
        },
    });

    const data = await response.text();

    // TODO: 正则匹配各项
    console.log(data);

    // let register: registerData = {
    //     updateTime: "",
    //     name: "",
    //     sex: SexEnum.MALE,
    //     nationality: "",
    //     college: "",
    //     level: "",
    //     profession: "",
    //     onlineVerificationCode: "",
    // };

    // return register;
}

export default submitKey;
