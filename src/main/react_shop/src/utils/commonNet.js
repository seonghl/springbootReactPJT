import axios from 'axios';
//import gCommonUi from './commonUi';

/*
 *-common.util = {
 */
    var gCommonNet = {

    /**
     * [Util공통] ajax 통신
     *
     * @param _URL      		: (필수) 전송URL(String)
     * @param _PARAM    		: (필수) 전송 파라미터(Object or String)
     * @param _CALLBACK 		: (필수) 콜백함수(Function)
     * @param _async    		: (선택) 동기화 여부(Boolean : Default true)
     * @param _errMsg   		: (선택) 에러메세지(String)
     * @param _loadingFlag  	: (선택) 로딩바 노출여부(Boolean : Default true)
     * @param _graLoadingFlag  	: (선택) 보장분석 로딩바 노출여부(Boolean : Default false)
     */
    gFnCallAjax: function(_URL, _PARAM, _CALLBACK, _async, _errMsg, _loadingFlag, _graLoadingFlag) {
        if(_URL != "") {
            if(_async == null) _async = true;
            //if(_loadingFlag == null) _loadingFlag = true;
            //if(_graLoadingFlag == null) _graLoadingFlag = false;
            /*
            $.ajax({
                type : "POST",
                url : _URL,
                data : _PARAM,
                async : _async,
                beforeSend : function(){
                    if(_loadingFlag) _graLoadingFlag ? gCommonUi.gFnGraLoadingUi.show() : gCommonUi.gFnLoadingUi.show();
                },
                success : function(res) {
                    _CALLBACK(res);
                },
                error : function(xhr, status, err) {
                    gCommonUtil.gFnCmnAjaxError(_URL, xhr, _errMsg);
                }
            }).always(function(){
                if(_loadingFlag) _graLoadingFlag ? gCommonUi.gFnGraLoadingUi.hide() : gCommonUi.gFnLoadingUi.hide();
            });
            */

            
                axios.get(_URL)
                .then(response => {
                        _CALLBACK(response);
                })
                .catch(error => console.log(error))
             


        } else {
            // gCommonUi.gFnPopup.alert("올바른 요청이 아닙니다.");
            return false;
        }
    },


    // /**
    //  * [Util공통] ajax 통신
    //  *
    //  * @param _URL      		: (필수) 전송URL(String)
    //  * @param _xhr      			: (필수) xhr
    //  * @param _errMsg   		: (선택) 에러메세지(String)
    //  */
    // gFnCmnAjaxError: function(_URL, _xhr, _errMsg) {
    //     gCommonUi.gFnLoadingUi.hide();
    //     console.error(_URL);
    //     console.error(_xhr.status);

    //     if(_xhr.status == 0){
    //         gCommonUi.gFnPopup.alert("서버에 연결할 수 없습니다. 인터넷 접속여부를 확인하십시오.");
    //     }else if(_xhr.status == 400){
    //         gCommonUi.gFnPopup.alert("서버가 요청을 접수했지만 요청 콘텐츠가 부적합니다.<br>[400]");
    //     }else if(_xhr.status == 401){
    //         gCommonUi.gFnPopup.alert("세션이 만료되었습니다. 로그인이 필요합니다.<br>[401]");
    //     }else if(_xhr.status == 403){
    //         gCommonUi.gFnPopup.alert("접근권한이 부족합니다. 권한이 있는 계정으로 로그인이 필요합니다.<br>[403]");
    //     }else if(_xhr.status == 404){
    //         gCommonUi.gFnPopup.alert("요청에 해당하는 자원이 존재하지 않습니다.<br>[404]");
    //     }else if(_xhr.status == 500 && !this.gFnIsNull(_xhr.responseJSON)){
    //         console.log(_xhr.responseJSON);
    //         gCommonUi.gFnPopup.alert("서버에 일시적인 장애가 발생하였습니다. 잠시 후 재 시도하시거나 관리자에게 문의하십시오.<br>[500]");
    //     }

    //     var birthDay = ssnNo.substring(2, 6);	//주민번호 생일4자리 추출

    //     //입력일(현재일)과 생일비교
    //     if(Number(fullDay) < Number(inputYear.concat(birthDay))) {
    //         realAge--;
    //     }

    //     return realAge;
    // },







    // /**
    //  * gFnMultiparPost . added by jmRyu 2022.0711
    //  * [Util공통] ajax multipartPost 통신
    //  */
    // gFnMultiparPost : function($form, options){
    //     console.log('--------gFn_multiparPost--------------------------------------------------------------');
    //     console.log('------options-------------',options);

    //     var defaults = {
    //         url: "",
    //         data:{},
    //         loadingflag:false,
    //         fileParameter: "file",
    //         files: [],
    //         success: function(data, status, xhr) {
    //         }
    //     };

    //     var opt = $.extend(defaults, options);
    //     var formData = new FormData($form[0]);
    //     var data = $.extend({}, opt.data);

    //     $.each(data, function(key, value){
    //         if (value !== "" || value !== null) {
    //             formData.append(key, value);
    //         }
    //     });

    //     console.log('----------------------------------------------------------------------');
    //     console.log('------formData-------------',options);

    //     $.ajax({
    //         url: opt.url,
    //         type: "post",
    //         timeout: 60000 * 5,
    //         enctype: 'multipart/form-data',
    //         data: formData,
    //         cache: false,
    //         processData: false,
    //         contentType: false,
    //         beforeSend: function(xhr, settings) {
    //             if(opt.loadingflag)gCommonUi.gFnLoadingUi.show();
    //         },
    //         success: function(data, status, xhr) {
    //             if ($.isFunction(opt.success)) {
    //                 console.log("gFn_multiparPost : " + data);

    //                 opt.success(data, status, xhr);
    //             }
    //         },
    //         complete: function(xhr, status) {
    //             if(opt.loadingflag) gCommonUi.gFnLoadingUi.hide();
    //         }
    //     });

    // },

}

export default gCommonNet;