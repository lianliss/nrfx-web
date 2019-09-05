// api schema gen (using with node)
const data = {"Ping":{"method":"GET","name":"ping","params":[]},"Test":{"method":"GET","name":"test","params":[]},"Lang":{"method":"GET","name":"lang","params":{"Code":{"name":"code","filters":{"0":"required","maxLen":2},"type":"body"}}},"Profile":{"SignUp":{"method":"PUT","name":"sign_up","params":{"Email":{"name":"email","filters":{"0":"required","maxLen":256,"1":"email"},"type":"body"},"Refer":{"name":"refer","filters":{"maxLen":256},"type":"body"}}},"FillAccount":{"method":"PUT","name":"fill_account","params":{"FirstName":{"name":"first_name","filters":["required"],"type":"body"},"LastName":{"name":"last_name","filters":["required"],"type":"body"},"Login":{"name":"login","filters":["required"],"type":"body"},"PhoneCode":{"name":"phone_code","filters":["required"],"type":"body"},"PhoneNumber":{"name":"phone_number","filters":["required"],"type":"body"},"Hash":{"name":"hash","filters":["required"],"type":"body"},"Password":{"name":"password","filters":{"0":"required","minLen":6},"type":"body"},"SmsCode":{"name":"sms_code","filters":["required"],"type":"body"}}},"FillAccountSendSms":{"method":"PUT","name":"fill_account_send_sms","params":{"PhoneCode":{"name":"phone_code","filters":["required","int"],"type":"body"},"PhoneNumber":{"name":"phone_number","filters":["required","int"],"type":"body"},"Hash":{"name":"hash","filters":["required"],"type":"body"}}},"SignIn":{"method":"POST","name":"sign_in","params":{"Login":{"name":"login","filters":["required"],"type":"body"},"Password":{"name":"password","filters":["required"],"type":"body"},"AppId":{"name":"app_id","filters":["required","positive"],"type":"body"}}},"SignInTwoStep":{"method":"POST","name":"sign_in_two_step","params":[]},"Default":{"method":"GET","name":"","params":[]},"Settings":{"method":"GET","name":"settings","params":[]},"UploadPhoto":{"method":"POST","name":"upload_photo","params":[]},"ChangeInfo":{"method":"PUT","name":"change_info","params":{"FirstName":{"name":"first_name","filters":["required"],"type":"body"},"LastName":{"name":"last_name","filters":["required"],"type":"body"}}},"ChangeLogin":{"method":"PUT","name":"change_login","params":{"Login":{"name":"login","filters":["required"],"type":"body"}}},"SendSms":{"method":"POST","name":"send_sms","params":{"PhoneCode":{"name":"phone_code","filters":["required","int","positive"],"type":"body"},"PhoneNumber":{"name":"phone_number","filters":["required","int","positive"],"type":"body"},"SmsCode":{"name":"sms_code","filters":["required","int","positive"],"type":"body"}}},"ChangeEmail":{"method":"POST","name":"change_email","params":{"Email":{"name":"email","filters":["required"],"type":"body"}}},"ChangePhoneNumber":{"method":"PUT","name":"change_phone_number","params":{"PhoneCode":{"name":"phone_code","filters":["required","int","positive"],"type":"body"},"PhoneNumber":{"name":"phone_number","filters":["required","int","positive"],"type":"body"}}},"CheckLogin":{"method":"POST","name":"check_login","params":{"Login":{"name":"login","filters":{"0":"required","minLen":3},"type":"body"}}},"ConfirmEmail":{"method":"POST","name":"confirm_email","params":{"Hash":{"name":"hash","filters":["required"],"type":"body"},"Email":{"name":"email","filters":["required"],"type":"body"}}}},"Wallet":{"Currencies":{"method":"GET","name":"currencies","params":[]},"Default":{"method":"GET","name":"","params":{"Count":{"name":"count","filters":{"default":20},"type":"body"}}},"Transaction":{"method":"GET","name":"transaction","params":{"StartFrom":{"name":"start_from","filters":["required"],"type":"body"},"Count":{"name":"count","filters":{"default":20},"type":"body"}}},"Transfer":{"method":"GET","name":"transfer","params":{"StartFrom":{"name":"start_from","filters":["required"],"type":"body"},"Count":{"name":"count","filters":{"default":20},"type":"body"}}},"TransactionId":{"method":"GET","name":"transaction\/%n:id","params":{"Id":{"name":"id","filters":["required","int","positive"],"type":"query"}}},"TransferId":{"method":"GET","name":"transfer\/%n:id","params":{"Id":{"name":"id","filters":["required","int","positive"],"type":"query"}}},"Send":{"method":"PUT","name":"send","params":{"WalletId":{"name":"wallet_id","filters":["required","positive","int"],"type":"body"},"Address":{"name":"address","filters":{"0":"required","maxLen":256},"type":"body"},"Amount":{"name":"amount","filters":["required","positive","double"],"type":"body"},"GaCode":{"name":"ga_code","filters":{"0":"required","maxLen":6,"minLen":6},"type":"body"}}},"Generate":{"method":"PUT","name":"generate","params":{"Currency":{"name":"currency","filters":["required","lowercase"],"type":"body"}}}},"Investment":{"Default":{"method":"GET","name":"","params":[]},"Withdrawal":{"method":"GET","name":"withdrawal","params":{"StartFrom":{"name":"start_from","filters":[],"type":"body"}}},"Profit":{"method":"GET","name":"profit","params":{"StartFrom":{"name":"start_from","filters":[],"type":"body"}}}},"Profit":{"Default":{"method":"GET","name":"","params":{"Offset":{"name":"offset","filters":["required","int","positive"],"type":"body"}}}},"Dashboard":{"Default":{"method":"GET","name":"","params":[]}},"Documentation":{"Schema":{"method":"GET","name":"schema","params":[]}},"Notification":{"Default":{"method":"GET","name":"","params":[]}},"Page":{"Default":{"method":"GET","name":"","params":{"Address":{"name":"address","filters":["required"],"type":"body"}}}},"User":{"method":"GET","name":"user","params":[]},"UserId":{"method":"DELETE","name":"user\/%n:id","params":[]}};

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(escapeRegExp(search, 'g'), replacement);
};

const apiTree = {
  methods: {},
  init: data => {
    apiTree.treatment(data);
    return apiTree.methods;
  },
  treatment: (data, path) => {
    let methods = [];
    for (let module in data) {
      if (data[module].hasOwnProperty('method')) {
        apiTree.oneMethodTreatment(
          data[module],
          {path: path ? path.path + '/' + data[module].name : data[module].name},
          module
        );
      } else {
        if (typeof data[module] === "object") {
          apiTree.treatment(data[module], {path: path ? (path.path + '/' + module) : module});
        }
      }
    }
  },
  oneMethodTreatment: (method, path = {}, module) => {
    let after = {...method};
    if (method.hasOwnProperty('params')) {
      after.params = apiTree.paramsTreatment(method.params);
    }
    if (path.hasOwnProperty('path')) {
      after.path = path.path.toLowerCase();
    }

    if (after.name === "") {
      after.name = after.path.slice(0, after.path.length - 1);
    }

    if (module.toLowerCase() !== "default") {
      after.name = module.toLowerCase();
    }
    apiTree.methods[after.path] = after;
  },
  paramsTreatment: params => {
    if (params.length < 1) return {};
    let after = {};
    for (let key in params) {
      after[params[key].name] = params[key];
    }
    return after;
  }
};

require("fs").writeFile(
  "schema_out.js",
  'export default ' + JSON.stringify((apiTree.init)(data)),
  error => {
    if (error) {throw error} else console.log(true);
  }
);


