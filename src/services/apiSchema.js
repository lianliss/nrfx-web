export default
{"PingGet":{"method":"GET","name":"ping","params":[],"path":"ping"},"Test":{"DefaultGet":{"method":"GET","name":"","params":[],"path":"test"}},"LangGet":{"method":"GET","name":"lang","params":{"Code":{"name":"code","filters":{"0":"required","maxLen":2},"type":"body"}},"path":"lang"},"Profile":{"SignUpPut":{"method":"PUT","name":"sign_up","params":{"Email":{"name":"email","filters":{"0":"required","maxLen":256,"1":"email"},"type":"body"},"Refer":{"name":"refer","filters":{"maxLen":256},"type":"body"},"InviteLink":{"name":"invite_link","filters":{"maxLen":256},"type":"body"}},"path":"profile\/sign_up"},"FillAccountPut":{"method":"PUT","name":"fill_account","params":{"FirstName":{"name":"first_name","filters":["required","username"],"type":"body"},"LastName":{"name":"last_name","filters":["required","username"],"type":"body"},"Login":{"name":"login","filters":["required"],"type":"body"},"PhoneCode":{"name":"phone_code","filters":["required"],"type":"body"},"PhoneNumber":{"name":"phone_number","filters":["required"],"type":"body"},"Hash":{"name":"hash","filters":["required"],"type":"body"},"Password":{"name":"password","filters":{"0":"required","minLen":6},"type":"body"},"SmsCode":{"name":"sms_code","filters":["required"],"type":"body"}},"path":"profile\/fill_account"},"FillAccountSendSmsPut":{"method":"PUT","name":"fill_account_send_sms","params":{"PhoneCode":{"name":"phone_code","filters":["required","int"],"type":"body"},"PhoneNumber":{"name":"phone_number","filters":["required","int"],"type":"body"},"Hash":{"name":"hash","filters":["required"],"type":"body"}},"path":"profile\/fill_account_send_sms"},"SignInPost":{"method":"POST","name":"sign_in","params":{"Login":{"name":"login","filters":["required"],"type":"body"},"Password":{"name":"password","filters":["required"],"type":"body"},"AppId":{"name":"app_id","filters":["required","positive"],"type":"body"},"PublicKey":{"name":"public_key","filters":["required"],"type":"body"}},"path":"profile\/sign_in"},"SecretKeyPost":{"method":"POST","name":"secret_key","params":{"Login":{"name":"login","filters":["required"],"type":"body"},"Password":{"name":"password","filters":["required"],"type":"body"},"AppId":{"name":"app_id","filters":["required","positive"],"type":"body"},"PublicKey":{"name":"public_key","filters":["required"],"type":"body"},"Secret":{"name":"secret","filters":{"0":"required","minLen":10},"type":"body"}},"path":"profile\/secret_key"},"SignInTwoStepPost":{"method":"POST","name":"sign_in_two_step","params":{"Login":{"name":"login","filters":["required"],"type":"body"},"Password":{"name":"password","filters":["required"],"type":"body"},"AppId":{"name":"app_id","filters":["required","positive"],"type":"body"},"PublicKey":{"name":"public_key","filters":["required"],"type":"body"},"GaCode":{"name":"ga_code","filters":{"0":"required","minLen":6,"maxLen":6},"type":"body"}},"path":"profile\/sign_in_two_step"},"ResetGaPost":{"method":"POST","name":"reset_ga","params":{"Login":{"name":"login","filters":["required"],"type":"body"},"Password":{"name":"password","filters":["required"],"type":"body"},"Secret":{"name":"secret","filters":["required"],"type":"body"}},"path":"profile\/reset_ga"},"ResetPasswordPost":{"method":"POST","name":"reset_password","params":{"Email":{"name":"email","filters":["required"],"type":"body"}},"path":"profile\/reset_password"},"ResetPasswordPut":{"method":"PUT","name":"reset_password","params":{"Hash":{"name":"hash","filters":["required"],"type":"body"},"Password":{"name":"password","filters":{"0":"required","minLen":6},"type":"body"}},"path":"profile\/reset_password"},"DefaultGet":{"method":"GET","name":"","params":[],"path":"profile"},"SettingsGet":{"method":"GET","name":"settings","params":[],"path":"profile\/settings"},"UploadPhotoPost":{"method":"POST","name":"upload_photo","params":[],"path":"profile\/upload_photo"},"SecretKeyLoggedPost":{"method":"POST","name":"secret_key_logged","params":{"Secret":{"name":"secret","filters":{"0":"required","minLen":10},"type":"body"}},"path":"profile\/secret_key_logged"},"ChangeInfoPut":{"method":"PUT","name":"change_info","params":{"FirstName":{"name":"first_name","filters":["required","username"],"type":"body"},"LastName":{"name":"last_name","filters":["required","username"],"type":"body"},"GaCode":{"name":"ga_code","filters":{"0":"required","minLen":6,"maxLen":6},"type":"body"}},"path":"profile\/change_info"},"ChangeLoginPut":{"method":"PUT","name":"change_login","params":{"Login":{"name":"login","filters":["required"],"type":"body"},"GaCode":{"name":"ga_code","filters":{"0":"required","minLen":6,"maxLen":6},"type":"body"}},"path":"profile\/change_login"},"SendSmsPost":{"method":"POST","name":"send_sms","params":{"PhoneCode":{"name":"phone_code","filters":["required","int","positive"],"type":"body"},"PhoneNumber":{"name":"phone_number","filters":["required","int","positive"],"type":"body"},"GaCode":{"name":"ga_code","filters":{"0":"required","minLen":6,"maxLen":6},"type":"body"}},"path":"profile\/send_sms"},"ChangeEmailPost":{"method":"POST","name":"change_email","params":{"Email":{"name":"email","filters":["required"],"type":"body"},"GaCode":{"name":"ga_code","filters":{"0":"required","minLen":6,"maxLen":6},"type":"body"}},"path":"profile\/change_email"},"ChangePasswordPost":{"method":"POST","name":"change_password","params":{"OldPassword":{"name":"old_password","filters":["required"],"type":"body"},"Password":{"name":"password","filters":{"0":"required","minLen":6},"type":"body"},"GaCode":{"name":"ga_code","filters":{"0":"required","minLen":6,"maxLen":6},"type":"body"}},"path":"profile\/change_password"},"GaInitPost":{"method":"POST","name":"ga_init","params":{"GaCode":{"name":"ga_code","filters":{"0":"required","minLen":6,"maxLen":6},"type":"body"}},"path":"profile\/ga_init"},"ChangePhoneNumberPut":{"method":"PUT","name":"change_phone_number","params":{"PhoneCode":{"name":"phone_code","filters":["required","int","positive"],"type":"body"},"PhoneNumber":{"name":"phone_number","filters":["required","int","positive"],"type":"body"},"SmsCode":{"name":"sms_code","filters":["required","int","positive"],"type":"body"}},"path":"profile\/change_phone_number"},"CheckLoginPost":{"method":"POST","name":"check_login","params":{"Login":{"name":"login","filters":{"0":"required","minLen":3},"type":"body"}},"path":"profile\/check_login"},"ConfirmEmailPost":{"method":"POST","name":"confirm_email","params":{"Hash":{"name":"hash","filters":["required"],"type":"body"},"Email":{"name":"email","filters":["required"],"type":"body"}},"path":"profile\/confirm_email"}},"Wallet":{"CurrenciesGet":{"method":"GET","name":"currencies","params":[],"path":"wallet\/currencies"},"DefaultGet":{"method":"GET","name":"","params":{"Count":{"name":"count","filters":{"default":20},"type":"body"}},"path":"wallet"},"TransactionGet":{"method":"GET","name":"transaction","params":{"StartFrom":{"name":"start_from","filters":["required"],"type":"body"},"Count":{"name":"count","filters":{"default":20},"type":"body"}},"path":"wallet\/transaction"},"TransferGet":{"method":"GET","name":"transfer","params":{"StartFrom":{"name":"start_from","filters":["required"],"type":"body"},"Count":{"name":"count","filters":{"default":20},"type":"body"}},"path":"wallet\/transfer"},"TransactionIdGet":{"method":"GET","name":"transaction\/%n:id","params":{"Id":{"name":"id","filters":["required","int"],"type":"query"}},"path":"wallet\/transaction\/%n:id"},"TransferIdGet":{"method":"GET","name":"transfer\/%n:id","params":{"Id":{"name":"id","filters":["required","int","positive"],"type":"query"}},"path":"wallet\/transfer\/%n:id"},"SendPut":{"method":"PUT","name":"send","params":{"WalletId":{"name":"wallet_id","filters":["required","positive","int"],"type":"body"},"Address":{"name":"address","filters":{"0":"required","maxLen":256},"type":"body"},"Amount":{"name":"amount","filters":["required","positive","double"],"type":"body"},"GaCode":{"name":"ga_code","filters":{"0":"required","minLen":6,"maxLen":6},"type":"body"}},"path":"wallet\/send"},"GeneratePut":{"method":"PUT","name":"generate","params":{"Currency":{"name":"currency","filters":["required","lowercase"],"type":"body"}},"path":"wallet\/generate"}},"Investment":{"DefaultGet":{"method":"GET","name":"","params":[],"path":"investment"},"WithdrawalGet":{"method":"GET","name":"withdrawal","params":{"StartFrom":{"name":"start_from","filters":[],"type":"body"}},"path":"investment\/withdrawal"},"ProfitGet":{"method":"GET","name":"profit","params":{"StartFrom":{"name":"start_from","filters":[],"type":"body"}},"path":"investment\/profit"},"WithdrawPut":{"method":"PUT","name":"withdraw","params":{"WalletId":{"name":"wallet_id","filters":["required","positive"],"type":"body"},"Amount":{"name":"amount","filters":["required","positive"],"type":"body"},"GaCode":{"name":"ga_code","filters":{"0":"required","minLen":6,"maxLen":6},"type":"body"}},"path":"investment\/withdraw"},"DepositPut":{"method":"PUT","name":"deposit","params":{"Amount":{"name":"amount","filters":["required","positive"],"type":"body"},"WalletId":{"name":"wallet_id","filters":["required","positive"],"type":"body"},"PlanId":{"name":"plan_id","filters":["required","positive"],"type":"body"},"DepositType":{"name":"deposit_type","filters":{"0":"required","oneOf":["static","dynamic"]},"type":"body"}},"path":"investment\/deposit"},"PlansGet":{"method":"GET","name":"plans","params":{"Currency":{"name":"currency","filters":["required"],"type":"body"},"Amount":{"name":"amount","filters":["positive"],"type":"body"},"DepositType":{"name":"deposit_type","filters":{"0":"required","oneOf":["dynamic","static"]},"type":"body"}},"path":"investment\/plans"}},"Profit":{"DefaultGet":{"method":"GET","name":"","params":{"Offset":{"name":"offset","filters":["required","int","positive"],"type":"body"}},"path":"profit"}},"Dashboard":{"DefaultGet":{"method":"GET","name":"","params":[],"path":"dashboard"}},"Documentation":{"SchemaGet":{"method":"GET","name":"schema","params":[],"path":"documentation\/schema"}},"Notification":{"DefaultGet":{"method":"GET","name":"","params":[],"path":"notification"},"DefaultDelete":{"method":"DELETE","name":"","params":{"NotificationId":{"name":"notification_id","filters":["required","positive"],"type":"body"},"Action":{"name":"action","filters":["required"],"type":"body"},"Params":{"name":"params","filters":["json"],"type":"body"}},"path":"notification"},"InternalGet":{"method":"GET","name":"internal","params":[],"path":"notification\/internal"}},"Page":{"DefaultGet":{"method":"GET","name":"","params":{"Address":{"name":"address","filters":["required"],"type":"body"}},"path":"page"}},"Partner":{"InviteLinkViewPost":{"method":"POST","name":"invite_link_view","params":{"Link":{"name":"link","filters":["required"],"type":"body"}},"path":"partner\/invite_link_view"},"DefaultGet":{"method":"GET","name":"","params":[],"path":"partner"},"ProfitChartGet":{"method":"GET","name":"profit_chart","params":{"Period":{"name":"period","filters":{"0":"required","1":"positive","oneOf":[30,365]},"type":"body"},"AgentId":{"name":"agent_id","filters":["positive"],"type":"body"}},"path":"partner\/profit_chart"},"ClientChartGet":{"method":"GET","name":"client_chart","params":{"Period":{"name":"period","filters":{"0":"required","1":"positive","oneOf":[30,365]},"type":"body"},"AgentId":{"name":"agent_id","filters":["positive"],"type":"body"}},"path":"partner\/client_chart"},"InviteLinkPut":{"method":"PUT","name":"invite_link","params":{"Name":{"name":"name","filters":["required"],"type":"body"}},"path":"partner\/invite_link"},"InviteLinkPost":{"method":"POST","name":"invite_link","params":{"Id":{"name":"id","filters":["required","positive"],"type":"body"},"Name":{"name":"name","filters":["required"],"type":"body"}},"path":"partner\/invite_link"},"InviteLinkDelete":{"method":"DELETE","name":"invite_link","params":{"Id":{"name":"id","filters":["required","positive"],"type":"body"}},"path":"partner\/invite_link"},"InviteLinkRestorePost":{"method":"POST","name":"invite_link_restore","params":{"Id":{"name":"id","filters":["required","positive"],"type":"body"}},"path":"partner\/invite_link_restore"},"PartnerInfoGet":{"method":"GET","name":"partner_info","params":{"Id":{"name":"id","filters":["required","positive"],"type":"body"}},"path":"partner\/partner_info"},"SendInvitePost":{"method":"POST","name":"send_invite","params":{"Login":{"name":"login","filters":["required"],"type":"body"}},"path":"partner\/send_invite"}},"Balance":{"DefaultGet":{"method":"GET","name":"","params":{"Category":{"name":"category","filters":{"0":"required","oneOf":["exchange"]},"type":"body"}},"path":"balance"},"WithdrawPost":{"method":"POST","name":"withdraw","params":{"BalanceId":{"name":"balance_id","filters":["required","positive"],"type":"body"},"Amount":{"name":"amount","filters":["required","positive"],"type":"body"}},"path":"balance\/withdraw"},"DepositPost":{"method":"POST","name":"deposit","params":{"WalletId":{"name":"wallet_id","filters":["required","positive"],"type":"body"},"Amount":{"name":"amount","filters":["required","positive"],"type":"body"}},"path":"balance\/deposit"}},"Exchange":{"DefaultGet":{"method":"GET","name":"","params":{"Market":{"name":"market","filters":["required","lowercase"],"type":"body"},"ChartTimeFrame":{"name":"chart_time_frame","filters":{"0":"positive","oneOf":[1,5,15,30,60,120,240],"default":5},"type":"body"}},"path":"exchange"},"OrderPut":{"method":"PUT","name":"order","params":{"Market":{"name":"market","filters":["required","lowercase"],"type":"body"},"Type":{"name":"type","filters":{"0":"required","oneOf":["limit","market"]},"type":"body"},"Action":{"name":"action","filters":{"0":"required","oneOf":["sell","buy"]},"type":"body"},"Amount":{"name":"amount","filters":["required","positive"],"type":"body"},"Price":{"name":"price","filters":["positive"],"type":"body"}},"path":"exchange\/order"},"OrderDelete":{"method":"DELETE","name":"order","params":{"OrderId":{"name":"order_id","filters":["required","positive"],"type":"body"},"Index":{"name":"index","filters":["int"],"type":"body"}},"path":"exchange\/order"},"OpenOrdersGet":{"method":"GET","name":"open_orders","params":{"Market":{"name":"market","filters":["required","lowercase"],"type":"body"}},"path":"exchange\/open_orders"},"CancelAllOrdersDelete":{"method":"DELETE","name":"cancel_all_orders","params":[],"path":"exchange\/cancel_all_orders"},"BalancesGet":{"method":"GET","name":"balances","params":[],"path":"exchange\/balances"},"TickersGet":{"method":"GET","name":"tickers","params":[],"path":"exchange\/tickers"},"MarketsGet":{"method":"GET","name":"markets","params":[],"path":"exchange\/markets"},"DepthGet":{"method":"GET","name":"depth","params":{"Market":{"name":"market","filters":["required","lowercase"],"type":"body"}},"path":"exchange\/depth"},"TradesGet":{"method":"GET","name":"trades","params":{"Market":{"name":"market","filters":["required","lowercase"],"type":"body"}},"path":"exchange\/trades"}},"Exchange_chart":{"ConfigGet":{"method":"GET","name":"config","params":[],"path":"exchange_chart\/config"},"SymbolInfoGet":{"method":"GET","name":"symbol_info","params":{"Group":{"name":"group","filters":["required","lowercase"],"type":"body"}},"path":"exchange_chart\/symbol_info"},"SymbolsGet":{"method":"GET","name":"symbols","params":{"Symbol":{"name":"symbol","filters":["required","lowercase"],"type":"body"}},"path":"exchange_chart\/symbols"},"HistoryGet":{"method":"GET","name":"history","params":{"Symbol":{"name":"symbol","filters":["required","lowercase"],"type":"body"},"Resolution":{"name":"resolution","filters":["required"],"type":"body"},"From":{"name":"from","filters":["required","int"],"type":"body"},"To":{"name":"to","filters":["required","int"],"type":"body"}},"path":"exchange_chart\/history"}},"Api_keys":{"DefaultGet":{"method":"GET","name":"","params":[],"path":"api_keys"},"DefaultPut":{"method":"PUT","name":"","params":{"Name":{"name":"name","filters":["required"],"type":"body"},"AllowIps":{"name":"allow_ips","filters":[],"type":"body"},"Permissions":{"name":"permissions","filters":[],"type":"body"},"GaCode":{"name":"ga_code","filters":{"0":"required","minLen":6,"maxLen":6},"type":"body"}},"path":"api_keys"},"DefaultDelete":{"method":"DELETE","name":"","params":{"KeyId":{"name":"key_id","filters":["required","positive"],"type":"body"},"GaCode":{"name":"ga_code","filters":{"0":"required","minLen":6,"maxLen":6},"type":"body"}},"path":"api_keys"},"DefaultPost":{"method":"POST","name":"","params":{"KeyId":{"name":"key_id","filters":["required","positive"],"type":"body"},"Name":{"name":"name","filters":["required"],"type":"body"},"AllowIps":{"name":"allow_ips","filters":[],"type":"body"},"Permissions":{"name":"permissions","filters":[],"type":"body"},"GaCode":{"name":"ga_code","filters":{"0":"required","minLen":6,"maxLen":6},"type":"body"}},"path":"api_keys"},"SecretGet":{"method":"GET","name":"secret","params":{"KeyId":{"name":"key_id","filters":["required","positive"],"type":"body"},"GaCode":{"name":"ga_code","filters":{"0":"required","minLen":6,"maxLen":6},"type":"body"}},"path":"api_keys\/secret"}}}