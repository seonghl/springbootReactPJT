// var init
var focusEl = [], popupDepthObj = 0 , _gfnCloseFn = {}, _gPopTargetObj = {}, _gPopTargetElement = {};

/*common.ui = {
	...common.ui,*/
var gCommonUi = {
	init:function(){
		console.log("common_ui init")
		this.gFnCommon.init();
		if($('.input-txt').length) this.gFnInp.init();
		if($('.tab-nav-container').length) this.gFnMenuScrollUi.init();
		if($('.input-txt.select').length) this.gFnDropDownUi.init();
		this.gFnAccordionUi.init();
		if($('.ui-check-item').length) this.gFnCardListUi.init();
		if($('.header_section nav').length) this.gFnGnbMenuUi.init();
		this.gFnTooltipUi.init();

		// My Menu Page OPEN
		if($('.scrollmn_page_group').length) this.gFnScrollMenuPageUi.init();

		// Toast OPEN
		if($('.pop-toast').length) this.gFnToastUi.init();

		// Both Menu OPEN
        if($('.gnb_al_list').length) this.gFnSeleteMenuUi.init();

        //ChkBox Extend
        if($('.input-checkbox.ui-check-el').length) this.gFnChkBoxClickBox.init();
    },


	gFnCommon:{
        init:function(){

            $(window).on('scroll', function () {
				var st = $(window).scrollTop();
				var header = $('header').height();

				if (st > header) {
					$('header .header_section').addClass('sub');
				} else {
					$('header .header_section').removeClass('sub');
				}
			});

        }
    },

	// chkbox area click ( 계약관리의 청구서류 영역만 해당 )
	gFnChkBoxClickBox: {
        init: function(){
            var chkItem = $('.items-lst.ui-check-item');

            if(chkItem.length){
                chkItem.off("click").on("click", function($obj){
                    var el = $($obj.currentTarget),
                        inp = el.find(".ui-check-el input[type=radio], .ui-check-el input[type=checkbox]")

                    !inp.is(':checked') ? el.addClass("checked") : el.removeClass("checked");
                    //console.log("item el : " + !inp.is(':checked') );

                    inp.is(":radio") ? inp.prop("checked") || inp.prop({checked:false}) : inp.prop({checked:!inp.prop("checked")})
                })
            }
        }
    },

    // inputBox In Delete Button
	gFnInp: {
		init: function(){
			var _this = this;
			_this.event();
		},
		event: function(){
			var _this = this,
			browser_height = $(window).height()/2, // 0519 추가
            arr_input = ["input[type=text]", "input[type=number]", "input[type=password]", "input[type=email]", "input[type=search]", "input[type=tel]", "input[type=url]", "textarea"];

            $.each( arr_input, function(idx,item){

                $(item).on("input change propertychange paste", function(e){
                    var $obj = $(e.currentTarget);
                    _this.changeEventHandler($obj);

                    //console.log("log : " + $obj.attr('class') );
                }).on("focusin", function(e){
                    var $obj = $(e.currentTarget);
                    if($obj.prop("readonly") == true || $obj.prop("disabled") == true ) return $obj.removeClass("ui-input-value").removeClass("ui-focus") , $obj.next(".ico-del").off("click").remove();
                    _this.changeEventHandler($obj);
                    $obj.addClass("ui-focus");

                    currFocusObj = $(e.currentTarget); // 0519 추가

					//0526 주석
                    // _this.keyPadEvent(currFocusObj, browser_height); // 0519 추가

                }).on("focusout", function(e){
                    var $obj = $(e.currentTarget);

					//0526 주석
					// _this.keyPadClose();// 0519 추가

                    setTimeout(function(){
                        $obj.val().length > 0 && ( $obj.removeClass("ui-input-value"), $obj.next(".ico-del").off("click").remove());
                        $obj.removeClass("pr_40") // 0518 추가
                    },150);
                })

            })

		},
        changeEventHandler: function($obj){

            // 0518 추가 --
            if($obj.parent().hasClass("tss") && $obj.hasClass("al_right")){
                if($obj.val().length > 0){
                    $obj.addClass("pr_40")
                }
            }
            // -- 0518 추가

            if($obj.val().length > 0 && $obj.hasClass("ui-focus") && $obj.hasClass("ui-text-del")){
                if($obj.next(".ico-del").length <= 0 ){
                    $obj.after('<button class="ico-del" type="button"> <span class="obj_blind">삭제</span> <i class="ico-style del"></i> </button>');
                }
                $obj.addClass("ui-input-value");
                $obj.next(".ico-del").on("click", function(e){
                    $(e.target).prev().val("");
                    $obj.next(".ico-del").off("click").remove();
                    $obj.removeClass("ui-input-value");
                    //$obj.focus();
                })
            }else{
                //console.log("log : " + $obj.attr('class') );
                $obj.removeClass("ui-input-value");
                $obj.next(".ico-del").off("click").remove();

            }
        },

        // -- 0519 추가
        keyPadEvent: function($obj,$height){

            var _this = this,
                obj = $obj,  // this input
				container_height = 0, // container Height
				paddingObj = null, // padding Object
				popObj = $(document).find('.full_pop_pos'), // popup
				input_height = currFocusObj.offset().top  // input Y axis

			if(obj.attr('readonly') == "readonly" || obj.attr('disabled') == "disabled") return false;

			if(popObj.length){
				container_height = $(window).height(); //popObj.find('.pop_info').height();
				paddingObj = popObj.find('.pop_inner_data');
			}else{
				container_height = $(window).height() //$(document).find('#contents .cont_grp_inner').height();
				paddingObj = $(document).find('#contents .cont_grp_inner');
			}

			console.log(" $height : " + $height + " container_height - input_height : " + (container_height - input_height) + " container_height : " + container_height + " input_height : " + input_height );

			if( $height > container_height - input_height ){
				$(paddingObj).css({'padding-bottom' : '300px'})
				_this.scrollTag(obj,popObj);
			}else{
				(popObj.length) ? $(paddingObj).css({'padding-bottom' : '100px'}) : $(paddingObj).css({'padding-bottom' : '20px'});
			}
        },

        scrollTag:function($obj,$popObj){
			if( $popObj.length ){
				$('html,body').find('div').animate({scrollTop: $obj.offset().top - 100}, 30);
				//console.log('POP IN');
			}else{
				$('html,body').animate({scrollTop: $obj.offset().top - 100}, 30);
				//console.log('PAGE IN');
			}
		},

        keyPadClose:function(){
			var paddingPopObj = null,
				popAllObj = $(document).find('.full_pop_pos')

			if( popAllObj.length ){
				paddingPopObj = popAllObj.find('.pop_inner_data');
				$(paddingPopObj).css({'padding-bottom' : '100px'})
			}else{
				paddingPopObj = $(document).find('#contents .cont_grp_inner');
				$(paddingPopObj).css({'padding-bottom' : '20px'})
			}
		}
        // 0519 추가 --

    },

    gFnToastUi: {
        init: function(){
            var toast = $('.pop-toast');
            toast.hide();
            toast.css({'opacity':'0'});
            toast.show();

            if(toast.hasClass('on')){
                toast.animate({ opacity:"1"}, 1000 ,function(){
                    // 4초뒤 삭제
                    var ShowToast = setTimeout(function(){
                        toast.animate({ opacity:"0"}, 1000, function(){
                            toast.hide();
                        });
                        clearTimeout(ShowToast);
                    },4000)

                });

            }
        }
    },

    // Popup Package
    gFnPopup: {

        /*
            - content     : Alert 내용
            - btnName     : Alert Button Text
            - closeEvent  : Alert Button 클릭 후 실행되는 이벤트
        */
        alert: function(content, btnName, closeEvent) {

			//같은 ID의 팝업이 있을 경우 실행하지 않는다.
			if($($('[data-popup="alert_popup"]')[0]).hasClass('open_popup')){
				console.error('알럿은 중복으로 노출 될 수 없습니다.');
				return false;
			}

            $("#alertCont").html(content);

            $("#alertClose").text(btnName ? btnName : '확인');
            $("#alertClose").off("click");
            $("#alertClose").click(function() {
                if(closeEvent) {
						closeEvent();
				}

                gCommonUi.gFnPopup.close('alert_popup');
            })
			gCommonUi.gFnExLoadingUi.hide();
            gCommonUi.gFnPopup.open('alert_popup');
        },


        /*
            - title           :   Confirm Title Text
            - content         :   Content Text
            - leftBtnName     :   Left Button Text
            - leftBtnEvent    :   Left Button 클릭 후 실행되는 이벤트
            - rightBtnName    :   Right Button Text
            - rightBtnEvent   :   Right Button 클릭 후 실행되는 이벤트
            - closeEvent      :   (생략 시 단순 닫기 기능) close 후 실행되는 이벤트
        */
        confirm: function(title, content, leftBtnName, leftBtnEvent, rightBtnName, rightBtnEvent, closeEvent) {

			//같은 ID의 팝업이 있을 경우 실행하지 않는다.
			if($($('[data-popup="confirm_popup"]')[0]).hasClass('open_popup')){
				console.error('컨펌은 중복으로 노출 될 수 없습니다.');
				return false;
			}

            $("#cfmTitle").text(title);
            $("#cfmContent").html(content);

            $("#cfmCancel").text(leftBtnName);
            $("#cfmCancel").off("click");
            $("#cfmCancel").click(leftBtnEvent);

            $("#cfmEnter").text(rightBtnName);
            $("#cfmEnter").off("click");
            $("#cfmEnter").click(rightBtnEvent);

            $("#cfmClose").off("click");
            $("#cfmClose").click(function() {
                if(closeEvent != undefined) { $("#cfmClose").click(closeEvent); }
                gCommonUi.gFnPopup.close('confirm_popup');
            });

			gCommonUi.gFnExLoadingUi.hide();
            gCommonUi.gFnPopup.open('confirm_popup');
        },

        /*
            - popupId         :       data-popup 값
            - url             :       서버 호출 URL
            - serverParam     :       서버 전달 파라미터
            - rcvParam        :       화면 to 화면 전달 데이터
            - closeEvent      :       popup close 시 실행되는 이벤트
 			- initFalse       :       popup 생성시 UI Script 초기화 막는 경우에만 인자값 false 입력. *default는 init 실행.
 			- xCallback       :       x 버튼 콜백
        */
        bottomPopup: function(popupId, url, serverParam, rcvParam, closeEvent, initFalse, xCallback) {

			//같은 ID의 팝업이 있을 경우 실행하지 않는다.
			if($("#popupArea").find('#'+popupId)[0] !== undefined){
				console.error('팝업 ID ['+popupId+'] 가 중복됩니다.');
				return false;
			}

 			// closeEvent 있을 시 FullPopup.close 시 실행되는 Popup Close Event 세팅
            if(typeof closeEvent === 'function'){
                _gfnCloseFn[popupId] = closeEvent;
            }

            // xCallback 있을 시 FullPopup.close 시 실행되는 Popup Close Event 세팅
            if(typeof xCallback === 'function'){
                _gfnCloseFn[popupId+'_x'] = xCallback;
            }

            // 화면 to 화면으로 전달 데이터 세팅
            if(typeof rcvParam === 'object'){
                _gPopTargetObj[popupId] = rcvParam;
            }

            // footer 내 <div id='popupArea' /> 에 jsp 로딩할 div 영역 추가
            $("#popupArea").append("<div id = '" + popupId + "'></div>");

			gCommonUi.gFnLoadingUi.show();
            $("#" + popupId).load(url, serverParam, function() {
                gCommonUi.gFnPopup.popHeight(popupId);
                gCommonUi.gFnPopup.open(popupId);

				gCommonUi.gFnLoadingUi.hide();

				gCommonUi.gFnPopup.xCloseEventBind(popupId);

				if(initFalse == false) return;
                gCommonUi.init();
            });
        },

        /*
            - id: Bottom Popup Id
        */
        popHeight: function($id){
            var $pop, $popid, $height, $btn, $btnHeight, $height = 0;

                $pop = $('.comm_bottom_pop[data-popup=\'' + $id + '\']'),
                $popid = $pop.attr('data-popup')

            if($popid == $id){

                var popH = setTimeout(function(){

                    $height = $pop.find('.foot_pop_inner').outerHeight(true);
                    $pop.css('height',$height);

                    $btn = $pop.find('.popup-footer');
                    $btnHeight = $btn.outerHeight(true);

                    if( $btn.length ) $pop.css('height', ($height+$btnHeight) );

                    clearTimeout(popH);
                },100)

            }
	    },

		  /*
            - popupId         :       data-popup 값
            - url             :       서버 호출 URL
            - serverParam     :       서버 전달 파라미터
            - rcvParam        :       화면 to 화면 전달 데이터
            - closeEvent      :       popup close 시 실행되는 이벤트
			- initFalse       :       popup 생성시 UI Script 초기화 막는 경우에만 인자값 false 입력. *default는 init 실행.
			- xCallback       :       x 버튼 콜백
        */
        simplePopup: function(popupId, url, serverParam, rcvParam, closeEvent, initFalse, xCallback) {

			//같은 ID의 팝업이 있을 경우 실행하지 않는다.
			if($("#popupArea").find('#'+popupId)[0] !== undefined){
				console.error('팝업 ID ['+popupId+'] 가 중복됩니다.');
				return false;
			}

			// closeEvent 있을 시 FullPopup.close 시 실행되는 Popup Close Event 세팅
            if(typeof closeEvent === 'function'){
                _gfnCloseFn[popupId] = closeEvent;
            }

        	// xCallback 있을 시 FullPopup.close 시 실행되는 Popup Close Event 세팅
            if(typeof xCallback === 'function'){
                _gfnCloseFn[popupId+'_x'] = xCallback;
            }

            // 화면 to 화면으로 전달 데이터 세팅
            if(typeof rcvParam === 'object'){
                _gPopTargetObj[popupId] = rcvParam;
            }

            // footer 내 <div id='popupArea' /> 에 jsp 로딩할 div 영역 추가
            $("#popupArea").append("<div id = '" + popupId + "'></div>");

			gCommonUi.gFnLoadingUi.show();

            $("#" + popupId).load(url, serverParam, function() {
                //gCommonUi.gFnPopup.popHeight(popupId);
                gCommonUi.gFnPopup.open(popupId);

				gCommonUi.gFnLoadingUi.hide();

				gCommonUi.gFnPopup.xCloseEventBind(popupId);

				if(initFalse == false) return;
                gCommonUi.init();
            });
        },

        /*
            - popupId         :       data-popup 값
            - url             :       서버 호출 URL
            - serverParam     :       서버 전달 파라미터
            - rcvParam        :       화면 to 화면 전달 데이터
            - closeEvent      :       popup close 시 실행되는 이벤트
            - initFalse       :       popup 생성시 UI Script 초기화 막는 경우에만 인자값 false 입력. *default는 init 실행.
			- xCallback       :       x 버튼 콜백
			- openElement     :       openElement
        */
        fullPopup: function(popupId, url, serverParam, rcvParam, closeEvent, initFalse, xCallback, openElement) {

			//같은 ID의 팝업이 있을 경우 실행하지 않는다.
			if($("#popupArea").find('#'+popupId)[0] !== undefined){
				console.error('팝업 ID ['+popupId+'] 가 중복됩니다.');
				return false;
			}

            // closeEvent 있을 시 FullPopup.close 시 실행되는 Popup Close Event 세팅
            if(typeof closeEvent === 'function'){
                _gfnCloseFn[popupId] = closeEvent;
            }

			// xCallback 있을 시 FullPopup.close 시 실행되는 Popup Close Event 세팅
            if(typeof xCallback === 'function'){
                _gfnCloseFn[popupId+'_x'] = xCallback;
            }

            // 화면 to 화면으로 전달 데이터 세팅
            if(typeof rcvParam === 'object'){
                _gPopTargetObj[popupId] = rcvParam;
				//$("#rcvParam").val(JSON.stringify(rcvParam)); //footer에 rcvParam 저장
			}

            // 해당 팝업을 띄운 openElement (jqeury selector)
            if(typeof openElement !== undefined){
                _gPopTargetElement[popupId] = $(openElement);
			}

            // footer 내 <div id='popupArea' /> 에 jsp 로딩할 div 영역 추가
            $("#popupArea").append("<div id = '" + popupId + "'></div>");

			gCommonUi.gFnLoadingUi.show();

            $("#" + popupId).load(url, serverParam, function() {
                gCommonUi.gFnPopup.open(popupId);

				gCommonUi.gFnLoadingUi.hide();

				gCommonUi.gFnPopup.xCloseEventBind(popupId);

				if(initFalse == false) return;
                gCommonUi.init();
            });

        },

        open: function($id){
            var currentObjId, currentPop,
            popupAll = document.querySelectorAll('[role="dialog"]')

            if(typeof $id != "object" ){
                if( typeof $id == "string"){
                    currentObjId = $id;
                }
            }else{
                currentObjId = $id;
            }

            for(var i=0; i<popupAll.length; i++){
                //console.log( " data-popup : " + popupAll[i].getAttribute('data-popup') + " currentObjId : " + currentObjId + " popupAll.length : " + popupAll.length )
                if(popupAll[i].getAttribute('data-popup') === currentObjId) {

                    currentPop = popupAll[i];  // current POP
                    popupDepthObj += 1; // pop depth

                    // popup dim create
                    var createdDimmed = function() {
                        var createDiv = document.createElement('div');
                        createDiv.classList.add('pop_dimmed');

                        if( popupDepthObj > 1 ){
                            createDiv.style.opacity = 1;
                        }else{
                            createDiv.style.opacity = 0;
                        }

                        currentPop.parentNode.appendChild(createDiv);
                        var dimPop = setTimeout(function(){
                            createDiv.style.opacity = 1;
                            clearTimeout(dimPop);
                        },100)
                    };

                    createdDimmed();  // if (popDimmed.length === 0)

                    // focusEl.splice((popupDepthObj - 1), 0, document.body);
                    focusEl.splice((popupDepthObj - 1), 0, currentObjId);
                    //console.log(  " OPEN : " + " focusEl : " + focusEl + " focusEl length : " + focusEl.length + " popupDepthObj : " + popupDepthObj );

                    // 버텀 팝업인경우
                    if(currentPop.classList.contains('comm_bottom_pop')){
                        currentPop.style.display = "block";
                    }else{
                        currentPop.style.display = "flex";
                    }

                    currentPop.setAttribute('popup-depth', popupDepthObj); // pop depth ++

                    document.body.classList.add('scroll_lock'); // body scroll lock
                    //popupAll[i].querySelector('.popTitle').focus();

                    var popTime = setTimeout(function(){  // POP OPEN
                        currentPop.classList.add('open_popup');
                        clearTimeout(popTime);
                    },100)

                    // POP 1개 이상인경우 이전팝업창에 prev_popup 적용
                    if (popupDepthObj > 1) document.querySelector('[popup-depth=\'' + ( popupDepthObj - 1 ) + '\']').classList.add('prev_popup');
                }
            }
        },
		/**
		 *
		 */
        close: function($id, _obj){
            var currentObjId, currentPop, popDimmed,
			popupAll = document.querySelectorAll('[role="dialog"]') // POP OBJ

			if(typeof $id != "object" ){
                if( typeof $id == "string"){
                    currentObjId = $id;
                }
            } else{
                currentObjId = $id;
            }

            for(var i=0; i<popupAll.length; i++){

                if(popupAll[i].getAttribute('data-popup') == currentObjId){
                    currentPop = popupAll[i];  // current POP
                    currentPop.classList.remove('open_popup');

                    // POP Delete
                    var popTime = setTimeout(function(){
                        currentPop.style.display = "none";
                        clearTimeout(popTime);
                    },150)

                    if(focusEl.length > 0) {
                        //focusEl[popupDepthObj - 1].focus(); // focus
                        focusEl.splice((popupDepthObj - 1), 1); // pop Element delete
                        popupDepthObj -= 1; // pop depth --
                    }

                    if (popupDepthObj == 0) { // 모든 팝업이 닫히면
                        document.body.classList.remove('scroll_lock'); // body scroll lock remove
                    }else{ // 이전 팝업 클래스 적용 ( z-index 낮춤 )
                        document.querySelector('.wrap_layer_popup[popup-depth=\'' + popupDepthObj + '\']').classList.remove('prev_popup');
                    }

                    // 220624 수정 => JCH 주석해제 3중 팝업 이후 바텀팝업 뜨면 해당 팝업의 딤 노출 안되어 해당 라인 임시 주석 해제
                    document.querySelector('.wrap_layer_popup[popup-depth=\'' + (popupDepthObj + 1) + '\']').removeAttribute('popup-depth');
                    //console.log(  " CLOSE : " + " focusEl : " + focusEl + " focusEl length : " + focusEl.length + " popupDepthObj : " + popupDepthObj );

                    popDimmed = currentPop.parentNode.querySelector('.pop_dimmed');

                    //if(popDimmed.parentNode !== null && popupDepthObj == 0){ // 모든 팝업이 닫히면 딤 삭제!


                    popDimmed.style.opacity = 0;
                    var dimPop = setTimeout(function(){
                        popDimmed.remove();

                        clearTimeout(dimPop);

                    	// popupArea 내 생성된 div 삭제
	                    $("#" + currentObjId).remove();

	                    // Popup Open 시 설정한 Close Event 실행
						if(_gfnCloseFn[currentObjId]){
							_gfnCloseFn[currentObjId](_obj);
						}

		                // Popup Open 시 설정한 x버튼 Event 실행
		                if(_gfnCloseFn[currentObjId+'_x']){
		                    delete _gfnCloseFn[currentObjId+'_x'];
		                }

                        // Popup Open 시 설정한 Close Event 삭제
                        if(_gfnCloseFn[currentObjId]){
                            delete _gfnCloseFn[currentObjId];
                        }
                        // 화면 to 화면으로 전달 데이터 삭제
                        if(_gPopTargetObj[currentObjId]) {
                            delete _gPopTargetObj[currentObjId]
                        }
                        // 해당 팝업을 띄운 openElement (jqeury selector)
                        if(_gPopTargetElement[currentObjId]) {
                            delete _gPopTargetElement[currentObjId]
                        }

                    },100)

                }
            };
        },
		/**
		 * 해당 팝업의 X 버튼 이벤트 바인딩
		 */
		xCloseEventBind: function(id) {
			//해당 팝업의 X 버튼 이벤트 바인딩
			var popTimeClose = setTimeout(function(){  // POP OPEN
				$popColseBtn = $('#'+id).find('.btn_pop_close');
				$popColseBtn.prop('popup-close',id);
				//off('click') 추가 2022-06-13
				$popColseBtn.off('click').on('click', function(){
	                // Popup Open 시 설정한 x버튼 Event 실행
	                if(_gfnCloseFn[id+'_x']){
	                    _gfnCloseFn[id+'_x']();
	                }else{
						gCommonUi.gFnPopup.simpleClose(id);
					}
				});
                clearTimeout(popTimeClose);
	        }, 350);
		},
		/**
		 * 단순 팝업 close
		 */
		simpleClose: function(id) {

            // Popup Open 시 설정한 Close Event 삭제
            if(_gfnCloseFn[id]){
                delete _gfnCloseFn[id];
            }
			this.close(id);
		},
        allClose: function(_obj){
            var currentPop,
			popupAll = document.querySelectorAll('.wrap_layer_popup.open_popup') // POP OBJ

            //console.log( " popupAll.length : " + popupAll.length );

            for(var i=0; i<popupAll.length; i++){

                currentPop = popupAll[i];
                currentPop.classList.remove('open_popup');
                currentPop.classList.remove('prev_popup');
                currentPop.removeAttribute('popup-depth');
                currentPop.style.display = "none";

                document.body.classList.remove('scroll_lock');

                if(focusEl.length > 0) {
                    //focusEl[0].focus(); // focus
                    focusEl = [] // pop Element reset
                    popupDepthObj = 0; // pop depth reset
                }

                currentPop.parentNode.querySelector('.pop_dimmed').remove();

                // Popup Open 시 설정한 Close Event 실행
                /*if(_gfnCloseFn[currentObjId]){
                    _gfnCloseFn[currentObjId](_obj);
                    delete _gfnCloseFn[currentObjId];
                }*/

                // 화면 to 화면으로 전달 데이터 삭제
                /*if(_gPopTargetObj[currentObjId]) {
                    delete _gPopTargetObj[currentObjId];
                }*/

                // popupArea 내 생성된 div 삭제
                $("#" + currentPop.getAttribute('data-popup')).remove();
            };
        },

        getRcvParam: function($id){
            return _gPopTargetObj[$id];
        }
    },

    // Bottom Animation POP
    // Not use
    gFnBottomPop: {
	    popHeight: function($id){
            var $pop, $popid, $height, $btn, $btnHeight, $height = 0;

                $pop = $('.comm_bottom_pop[data-popup=\'' + $id + '\']'),
                $popid = $pop.attr('data-popup')
                //console.log( " $pop : " + $pop )
                //console.log( " $popid : " + $popid )

            if($popid == $id){

                var popH = setTimeout(function(){

                    $height = $pop.find('.foot_pop_inner').outerHeight(true);
                    $pop.css('height',$height);

                    $btn = $pop.find('.popup-footer');
                    $btnHeight = $btn.outerHeight(true);

                    if( $btn.length ) $pop.css('height', ($height+$btnHeight) );

                    //console.log( " $height : " + $height )
                    //console.log( " $btnHeight : " + $btnHeight )

                    clearTimeout(popH);
                },100)

            }
	    },

        open: function($id){
            var _this = this;
			_this.popHeight($id);
			gCommonUi.gFnPopup.open($id); //POP Open Event
		},

		close: function($id){
			gCommonUi.gFnPopup.close($id);//POP Close Event
		}
    },

    // Menu Scroll + Content Open
    gFnMenuScrollUi: {
        init:function(){

            var _this = this,
                tabCont = $('.tab-nav-container.tp02'),
                btnView = $('.ui-action.select_btns'),
                xscroll = $('.tab-nav-container.tp02.tab_scr_square .scroll')

            $.each(tabCont, function(idx,item){

                openCont(0,$(item)); // 초기값

                /*if( !!!$(item).find(btnView).length ){ // 초기값이 필요없는 버튼인경우
                    $(item).find(".ui-action li").eq(0).addClass("active");
                    //console.log( " .tab-nav-container.tp02  : " + $(item) );
                }*/

                //console.log( "scrollMenu idx : " + idx );

                $(item).off('click').on('click', '.ui-action a', function(e){
                    e.preventDefault();

                    var currEle = $(e.currentTarget),
                        num = $(e.currentTarget).closest("li").index();

                    $(item).find(".ui-action a").removeClass("active")
                    currEle.addClass("active"),

                    $(item).find(".ui-action li").removeClass("active"),
                    currEle.parent().addClass("active");

                    //console.log( "attr num : " + $(item).attr('class') );


                    if( $(item).find(".ui-tab-nav").length ) {
                        _this.tabMove($(item).find(".ui-tab-nav"), $(item).find(".ui-tab-nav li.active"));
                        openCont(num, $(item));
                        //console.log( "openCont num : " + num );
                    }
                })

                if( xscroll.length ){
                    xscroll.on('scroll', function(){
                        xscroll.parent().addClass('scroll_row')
                    })
                }
            });

            function openCont($num,$target){
                var tab_group = $($target).find('.ui-tab-contents');
                //console.log( " tab_group :" + tab_group );
                if(tab_group.length){
                    tab_group.find('.ui-tab-content').eq($num).show().siblings().hide();
                    tab_group.scrollTop(0); // 최상단 스크롤

                }

            }

        },

        tabMove: function($movEle , $currEle){
            var pEle = arguments.length > 2 && 0 !== arguments[2] ? arguments[2] : 50,
            mEle = $movEle[0].scrollLeft,
            cEle = $currEle.position().left;

            $movEle.stop().animate({ scrollLeft:mEle + cEle - pEle}, 200, 'linear')
            //console.log( " arguments.length :" + mEle );
        }
    },

    // DropMenu
    gFnDropDownUi: {
        init: function(){
            var _this = this;
                selectBox = $('.input-txt.select');
			//off('click') 추가 2022-06-13
            selectBox.off('click').on('click', '.ui-select-btn', function(e){
                e.preventDefault();

                var currTarget = $(e.currentTarget)
                currTarget.siblings(".wrap-list-dropdown").hasClass("active") ? _this.close(currTarget) : _this.open(currTarget)

                $("body").off("click.body"), setTimeout(function(){
                    $("body").on("click.body", function(e){
                        currTarget.siblings(".wrap-list-dropdown").has(e.target).length || _this.close(currTarget);
                        //console.log( " length :" + currTarget.siblings(".wrap-list-dropdown").has(e.target).length );
                    })
                });

                currTarget.siblings(".wrap-list-dropdown").off("click").on("click","button",function(e){
                    e.preventDefault();

                    var idx, txt, currObj = $(e.currentTarget);
                        currTarget.siblings(".wrap-list-dropdown").find("button").removeClass("active");
                        currObj.addClass("active");

                        idx = currObj.closest("li").index()+1; // 셀렉트 메뉴 넘버
                        txt = currObj.text();
                        currTarget.find('.ui-select-text').text(txt);
                        //console.log( " text :" + txt );

                        _this.close(currTarget);
                })

            })

        },
        open: function($currTarget){
            $currTarget.siblings(".wrap-list-dropdown").addClass("active");
        },
        close: function($currTarget){
            $currTarget.siblings(".wrap-list-dropdown").removeClass("active");
        }
    },

    // Accordion
	gFnAccordionUi: {
		init:function(){
			var accList = $('.ui-accordion-list');

			if(accList.length){
				accList.each(function(){

					var _this = $(this),
                        openObj = _this.find('.ui-accordion-btn');

					if( openObj.closest(accList).hasClass('open') ){
						openObj.attr('title','닫기');
					}else{
						openObj.attr('title','열기');
					}
					//off('click') 추가 2022-06-13
					_this.find('.ui-accordion-btn').off('click').on('click',function(e){
						e.preventDefault();
                        var btn = $(this); // btn

                         // 팝업창안에 아코디언
                        if(btn.closest('.comm_bottom_pop').length){

                            if(btn.closest(accList).hasClass('open')){

                                btn.parent().siblings('.agree-sub').slideUp(40, function(){
                                    var cont = $(this);
                                    cont.closest(accList).removeClass('open');

                                    var $height = cont.closest('.foot_pop_inner').outerHeight(true), // 컨텐츠영역
                                        $btnHeight = cont.closest('.foot_pop_inner').siblings('.popup-footer').outerHeight(true), // 버튼영역
                                        $sum = ( $height + $btnHeight)
                                        //console.log( " 높이값 ::: " + $sum );
                                    cont.closest('.comm_bottom_pop').css('height', $sum );
                                });
                                btn.attr('title','열기');

                            }else{

                                btn.parent().siblings('.agree-sub').slideDown(50, function(){
                                    var cont = $(this);

                                    cont.closest(accList).addClass('open');

                                    var $height = cont.closest('.foot_pop_inner').outerHeight(true), // 컨텐츠영역
                                        $btnHeight = cont.closest('.foot_pop_inner').siblings('.popup-footer').outerHeight(true), // 버튼영역
                                        $sum = ( $height + $btnHeight)
                                        //console.log( " 높이값 ::: " + $sum );
                                    cont.closest('.comm_bottom_pop').css('height', $sum );

                                });
                                btn.attr('title','닫기');
                                //console.log( " 열림 ::: ");
                            }
                        }else{ // 바닥 아코디언

                            if(btn.closest(accList).hasClass('open')){

                                btn.siblings('.cont-area').slideUp(40, function(){
                                    var cont = $(this);
                                    cont.closest(accList).removeClass('open');
                                });
                                btn.attr('title','열기');


                            }else{

                                btn.siblings('.cont-area').slideDown(50, function(){
                                    var cont = $(this);
                                    cont.closest(accList).addClass('open');
                                });
                                btn.attr('title','닫기');
                                gCommonUi.gFnAutoScrollUi.init(btn); // 해당 버튼 스크롤
                            }

                        }

					});
				})
			};

            var accoBottomList = $('.folding-wrap-tp01.ui-expand');

            if(accoBottomList.length){

                accoBottomList.each(function(){

					var _this = $(this),
                        openObj = _this.find('.ui-expand-btn');

					if( openObj.closest(accoBottomList).hasClass('open') ){
						openObj.attr('title','닫기');
					}else{
						openObj.attr('title','열기');
					}
					//off('click') 추가 2022-06-13
					_this.find('.ui-expand-btn').off('click').on('click',function(e){
						e.preventDefault();
                        var btn = $(this); // btn

                        if(btn.closest(accoBottomList).hasClass('open')){

                            btn.siblings('.notice-list').slideUp(40, function(){
                                var cont = $(this);
                                cont.closest(accoBottomList).removeClass('open');
                            });
                            btn.attr('title','열기');

                        }else{

                            btn.siblings('.notice-list').slideDown(50, function(){
                                var cont = $(this);
                                cont.closest(accoBottomList).addClass('open');
                            });
                            btn.attr('title','닫기');

                        }
                    })
                })
            }
		}
	},

    // CardList
    gFnCardListUi: {
        init: function(){
            var cardList = $('.ui-check-item'),
                cardExpList = $('.ui-expand')

            if(cardList.length){

                cardList.on("change",".ui-check-el input[type=radio], .ui-check-el input[type=checkbox]", function(e){
                    var currObj = $(e.currentTarget);

                    if(currObj.closest(".ui-check-item").length){
                        currObj.closest(".input-wrap-group").find(".ui-check-el input[type=radio], .ui-check-el input[type=checkbox]").each(function(idx,item){
                            item.checked ? $(item).closest(".ui-check-item").addClass("checked") : $(item).closest(".ui-check-item").removeClass("checked");
                        })
                    }

                });
            }

            if(cardExpList.length){

                cardExpList.each(function(){

					var _this = $(this),
                        openBtn = _this.find('.ui-expand-btn');


					if( openBtn.closest(cardExpList).hasClass('open') ){
						openBtn.attr('title','닫기');
					}else{
						openBtn.attr('title','열기');
					}
					//off('click') 추가 2022-06-13
					_this.find('.ui-expand-btn').off('click').on('click',function(e){
						e.preventDefault();
                        var btn = $(this); // btn

                        console.log("ui-expand-btn");
                        if(btn.closest(cardExpList).hasClass('open')){

                            btn.closest(cardExpList).removeClass('open');
                            btn.attr('aria-expanded','false');
                            // btn.siblings('.notice-list').slideUp(40, function(){
                            //     var cont = $(this);
                            //     cont.closest(cardExpList).removeClass('open');
                            // });
                            btn.attr('title','열기');

                        }else{

                            btn.closest(cardExpList).addClass('open');
                            btn.attr('aria-expanded','true');
                            // btn.siblings('.notice-list').slideDown(50, function(){
                            //     var cont = $(this);
                            //     cont.closest(cardExpList).addClass('open');
                            // });
                            btn.attr('title','닫기');

                        }
                    })
                })
            }

        }
    },

    // Auto Scroll
	gFnAutoScrollUi: {
        init: function($obj){
            var popBoxObj = $($obj).closest(".wrap_layer_popup.open_popup").find('.pop_content.inner_layer_pop'),
                popHeadObj = $($obj).closest(".pop_container").siblings(".pop_header.pos_sticky")
                //sumTop = 0

            if($obj.length){

                //sumTop = $($obj).offset().top;
                //sumTop = $($obj).offset().top - $($obj).outerHeight();

                if(popHeadObj.length){ // 팝업안 오브젝트 위치로 스크롤

                    var popShowTime = setTimeout(function(){  // POP OPEN
                        $(popBoxObj).animate({ scrollTop: ( $($obj).position().top + popHeadObj.outerHeight()) },500); // 0524 수정!
                        //console.log( "팝업안 스크롤위치값 :: " +  ( popBoxObj.scrollTop() + $($obj).offset().top  - popHeadObj.outerHeight() )    );
                        clearTimeout(popShowTime);
                    },450,'easeOutExpo')

                }else{ // 바닥 오브젝트 위치로 스크롤

                    var pageShowTime = setTimeout(function(){  // POP OPEN
                        $("html, body").animate({ scrollTop: Math.ceil(($obj).offset().top) },500);
                        clearTimeout(pageShowTime);
                    },450,'easeOutExpo')

                    // $("html, body").animate({scrollTop: Math.ceil($($obj).offset().top)},500,function(){
                    //     //$($obj).focus();
                    // });
                    //console.log( "바닥 스크롤위치값 :: " + sumTop  );
                }

            }

        }
	},

	// GNB
	gFnGnbMenuUi :{
        init: function(){
            var _this = this,
                btn, scrollY, winH, gnbHeight, obj_h,
                arrIdx = [], arrFlag = false, noScrollFlag = false,
                pageBx = $('nav').find('.nav_tmn_box .gnb-menu'),

                ancCont = $('.anchor_wrap').find('.tab-nav-container.tp_gnb'),
                gnbBox = $('nav').find('.gnb_header'),
                menuY = pageBx.find(".category-wrap"),
                scrInnerHeight, scrollObjHeight,
                num = 0

            $(window).resize(function(){
                num++;

                winH = window.innerHeight;
		        gnbHeight = $('.gnb_header').height();
		        obj_h = winH - (gnbHeight);

                pageBx.height( obj_h );

                scrInnerHeight = pageBx.innerHeight();
                scrollObjHeight = pageBx.prop('scrollHeight');

                //console.log(' 메뉴변화감지 : ' + num + ' winH : ' + winH + ' gnbHeight : ' + gnbHeight + ' obj_h : ' + obj_h );
                //console.log(' 메뉴변화컨텐츠크기 : ' + num + ' scrInnerHeight :: ' + scrInnerHeight + ' scrollObjHeight :: ' + scrollObjHeight );
            })

            // GNB OPEN CLICK
            $('.btn_nav').off('click').on('click', function(){

                winH = window.innerHeight;
		        gnbHeight = $('.gnb_header').height();
		        obj_h = winH - (gnbHeight);
                pageBx.height( obj_h );

                btn = $(this)
                btn.parent('nav').find('.nav_wrap').show();

                setTimeout(function(){
                    btn.parent('nav').addClass('open')
                },20);

                //gCommonUi.gFnScrollDisable.init();

                _this.closeGnb(); //target, btn : Close Event

                scrInnerHeight = pageBx.innerHeight();
                scrollObjHeight = pageBx.prop('scrollHeight');

                if(arrFlag == false){
                    // 메뉴 위치값 배열저장
                    var mnLength = menuY.length;

                    menuY.each(function(num){
                        if(num !== (mnLength - 1)){
                            arrIdx[num] = Math.ceil( $(this).position().top );
                        }else{
                            arrIdx[num] = Math.ceil( $(this).position().top );
                        }
                    });


                    arrFlag = true;
                    //console.log(' arrIdx : ' + arrIdx );
                }

                //console.log(' 스크롤영역 크기값 : scrInnerHeight :' + scrInnerHeight + ' 스크롤영역 전체크기값 : scrollObjHeight :: ' + scrollObjHeight );
            });

            // Top Menu Event
            if(ancCont.length){
                ancCont.off("click").on("click",".tab-link", function(evt){
                    evt.preventDefault();

                    var idx = $(evt.currentTarget).closest(".tab-item").index(),
                        currEle = $(evt.currentTarget),
                        ancObj = $(evt.currentTarget).closest(".gnb_header").siblings(".gnb-menu"); // 스크롤 객체 부모높이값

                    // 클릭 효과
                    ancCont.find(".ui-tab-nav li").removeClass("active"),
                    currEle.parent().addClass("active");

                    // 클릭한 메뉴 좌우 무빙
                    if( ancCont.find(".ui-tab-nav").length ) {
                        gCommonUi.gFnMenuScrollUi.tabMove(ancCont.find(".ui-tab-nav"), ancCont.find(".ui-tab-nav li.active"));
                    }

                    // 클릭한 메뉴 컨텐츠 아래로 무빙
                    _this.moveGnb( menuY.eq(idx).position().top , ancObj )

                    // 스크롤 막기
                    noScrollFlag = true;

                    // 스크롤 가능하게 복구
                    var playScroll = setTimeout(function(){
                        noScrollFlag = false;
                        clearTimeout(playScroll);
                    },600)

                })
            }

            // GNB 컨텐츠 영역 스크롤
            pageBx.on("scroll",function(){
                // gnb Obj
                var $this = $(this),
                    sum = arrIdx.length;

                scrollY = Math.ceil( $this.scrollTop() );

                if( noScrollFlag == false ){ // 메큐 클릭시 동작안하기!

                    for(var i=0; i<sum; i++){
                        if( scrollY + scrInnerHeight >= scrollObjHeight ){ // 스크롤 맨아래 감지
                            ancCont.find(".ui-tab-nav li").removeClass("active");
                            gCommonUi.gFnMenuScrollUi.tabMove( ancCont.find(".ui-tab-nav"), ancCont.find(".ui-tab-nav li").eq(i).addClass('active'));
                        }else if( scrollY >= arrIdx[i] ){
                            ancCont.find(".ui-tab-nav li").removeClass("active");
                            gCommonUi.gFnMenuScrollUi.tabMove( ancCont.find(".ui-tab-nav"), ancCont.find(".ui-tab-nav li").eq(i).addClass('active'));
                        }
                    }
                }
                //console.log(' YScroll : ' + scrollY + ' scrInnerHeight :: ' + scrInnerHeight + ' totle :: ' + (scrollY + scrInnerHeight) + ' scrollObjHeight :: ' + scrollObjHeight )
            })

			setTimeout(function(){
				window.scrollTo(0, 0);
			},100);
        },

        moveGnb: function($num , $obj){
            var _num = $num,
                gnbMn = $obj;
            $(gnbMn).delay(100).animate({ scrollTop: (gnbMn.scrollTop() + _num ) },300);
            //console.log(" _num : " + _num );
        },

        closeGnb: function(){
            var btn;
            // gnb close
            //off('click') 추가 2022-06-13
            $('.btn_nav_close').off('click').on('click', function(e){
                e.preventDefault();

                btn = $(this);
                $('.wrapper').find('.header').css('z-index','69');

                gCommonUi.gFnScrollAble.init();

                btn.parent().parent('nav').removeClass('open');

                var closeDel = setTimeout(function(){
                    btn.parent('.nav_wrap').hide();
                    clearTimeout(closeDel);
                },150);
            });

        }
    },

    // Scroll Menu/Page ( My Menu )
    gFnScrollMenuPageUi: {
        init: function(){
            var popObj = $('.my_pages_wrap'),
                scrollObj = popObj.find('.pop_wrap .pop_content'),
                mnLength, arrMyIdx = [],
                arrFlag = false,
                noneScrollFlag = false,
                header = popObj.find('.header_fix_group').height(),
                fixMn = popObj.find('.scrollmn_page_group'),
                tabObj = fixMn.find('.tab-nav-container.my_tab_type'),
                tabMnList = tabObj.find('.tab-nav'),
                cateObj = fixMn.find(".gnb-menu .category-wrap"),
                innerHeight, scrollHeight

            // Menu Click Event
            if(fixMn.length){
                tabMnList.off("click").on("click",".tab-link", function(evt){
                    evt.preventDefault();

                    var idx = $(evt.currentTarget).closest(".tab-item").index(), popContObj,
                        currEle = $(evt.currentTarget),
                        categoryObj = fixMn.find(".gnb-menu .category-wrap").eq(idx).offset().top,
                        popheadObj = scrollObj.find('.pop_header .pop_header_area').outerHeight()

                    // 스크롤 막기
                    noneScrollFlag = true;

                    // 220614 수정
                    popContObj = tabObj.outerHeight();

                    // 클릭 효과
                    tabObj.find(".ui-tab-nav li").removeClass("active"),
                    currEle.parent().addClass("active");

                    // 클릭한 메뉴 좌우 무빙
                    if( tabObj.find(".ui-tab-nav").length ) {
                        gCommonUi.gFnMenuScrollUi.tabMove(tabObj.find(".ui-tab-nav"), tabObj.find(".ui-tab-nav li.active"));
                    }

                    // 클릭한 메뉴 컨텐츠 아래로 무빙
                    gCommonUi.gFnGnbMenuUi.moveGnb( ( categoryObj -  (popheadObj + popContObj) ), scrollObj )

                    // 스크롤 가능하게 복구
                    var setPlayScroll = setTimeout(function(){
                        noneScrollFlag = false;
                        clearTimeout(setPlayScroll);
                    },500)
                })
            }

            // Scroll Event
            scrollObj.on('scroll', function(){
                var $this = $(this),
                    sum = arrMyIdx.length,
                    popScroll = $this.scrollTop(),
                    scrollPY = Math.ceil( popScroll );

                if(arrFlag == false){
                    // 메뉴 위치값 배열저장
                    mnLength = cateObj.length;

                    cateObj.each(function(num){
                        if(num !== (mnLength - 1)){
                            arrMyIdx[num] = Math.ceil( $(this).offset().top - 100 ); // $(this).offset().top 값을 못가져옴
                        }else{
                            arrMyIdx[num] = Math.ceil( $(this).offset().top - 100 ); // Last Arr
                        }
                    });
                    arrFlag = true;
                    console.log(' arrMyIdx : ' + arrMyIdx );
                }

                innerHeight = scrollObj.innerHeight();
                scrollHeight = scrollObj.prop('scrollHeight');

                if( noneScrollFlag == false ){ // 메뉴 클릭시 동작안하기!
                    for(var i=0; i<sum; i++){
                        if( scrollPY + innerHeight >= scrollHeight ){ // 스크롤 맨아래 감지
                            tabObj.find(".ui-tab-nav li").removeClass("active");
                            gCommonUi.gFnMenuScrollUi.tabMove( tabObj.find(".ui-tab-nav"), tabObj.find(".ui-tab-nav li").eq(i).addClass('active'));
                        }else if( scrollPY >= arrMyIdx[i] ){
                            tabObj.find(".ui-tab-nav li").removeClass("active");
                            gCommonUi.gFnMenuScrollUi.tabMove( tabObj.find(".ui-tab-nav"), tabObj.find(".ui-tab-nav li").eq(i).addClass('active'));
                        }
                    }
                }
                //console.log(' YScroll : ' + scrollPY + ' innerHeight :: ' + innerHeight + ' totle :: ' + (scrollPY + innerHeight) + ' scrollHeight :: ' + scrollHeight )

                if (popScroll > header) {
                    fixMn.addClass('fixed');
                } else {
                    fixMn.removeClass('fixed');
                }
                //console.log(' Menu scrollPY : ' + scrollPY )
			});
        }
    },

    // tooltip
    gFnTooltipUi: {
        init: function(){
            var _this = this;
            //off('click') 추가 2022-06-13
            $('.wrapper').off('click').on('click','.tooltip_btn', function(e){
                e.preventDefault();

                var currTarget = $(e.currentTarget),
                    tipObj = currTarget.parent().siblings('.tooltip_page')

                tipObj.hasClass("open") ? _this.close(currTarget) : _this.open(currTarget)

                // 존재하면 닫기버튼 클릭
                if(!!!tipObj.hasClass("open")){
                	//off('click') 추가 2022-06-13
                    tipObj.off('click').on('click','.tooltip-close',function(){
                        _this.close(currTarget);
                    })
                }

                $("body").off("click.body"), setTimeout(function(){
                    $("body").on("click.body", function(e){
                        tipObj.has(e.target).length || _this.close(currTarget);
                    })
                });
            })
        },
        open: function($currTarget){
            $currTarget.addClass('on'); // btn
            var moveOpen = setTimeout(function(){
                $currTarget.parent().siblings(".tooltip_page").addClass("open");
                clearTimeout(moveOpen);
            },100)

        },
        close: function($currTarget){
            $currTarget.removeClass('on'); // btn
            var moveClose = setTimeout(function(){
                $currTarget.parent().siblings(".tooltip_page").removeClass("open");
                clearTimeout(moveClose);
            },100)
        }
    },

    // obj bottom Animation
    gFnMotionGroupUi: {
        open: function(target){
            var obj_gp = $(target)

            //if(!obj_gp.hasClass(':visible')){
                obj_gp.show();
                obj_gp.addClass('on');
                gCommonUi.gFnAutoScrollUi.init(obj_gp);
            //}
	    },
        close: function(target){
            var obj_gp = $(target)

            //if(obj_gp.is(':visible')){
                obj_gp.removeClass('on');

                var delObj = setTimeout(function(){
                    obj_gp.hide();
                    clearTimeout(delObj);
                },100)
            //}
        }
    },

	// Prod Select Both Menu
    gFnSeleteMenuUi: {
        init: function(){

            var $obj = $('.gnb_al_list'),
            $btn = $obj.find('li > .ui_btn_dep1'),
            winH = window.innerHeight,
            topBx = $('.full_pop_pos').find('.pop_header').height() + $('.full_pop_pos').find('.otu_dest_zone .wrap_step_arrow').height() + $('.full_pop_pos').find('.pop_inner_data .tit_inner').height() + $('.full_pop_pos').find('.popup-footer').height(), //outerHeight(true)

            obj_h = winH - (topBx) - 100, // 0518 100으로 수정
            subMenu = $obj.find('li > .ui_dep2_wrap')

            //console.log( "topBx : " + topBx );

            if( $obj.length ){

                subMenu.height( obj_h );
                //console.log( " menu : " + subMenu + " obj_h : " + obj_h )

                $btn.off('click').on('click',function(e){
                    e.preventDefault();

                    //console.log( " topBx : " + topBx + " obj_h : " + obj_h )

                    $(this).parent().siblings().find('.ui_btn_dep1').removeClass('on');
                    $(this).addClass('on');

                });
            }
        },

    },
        // loading Bar -- 220520
    gFnLoadingUi: {
        show: function(){
            var strhtml = "";
            strhtml = strhtml + '<div id="_gFnLoadingUi" class="pop_loading_basic">';
            strhtml = strhtml + '<div id="loading" class="loading_box">';
            strhtml = strhtml + '<div class="mask_box">';
            strhtml = strhtml + '</div>';
            strhtml = strhtml + '<div class="ball-loader">';
            strhtml = strhtml + '<div class="ball-loader-ball ball1"></div>';
            strhtml = strhtml + '<div class="ball-loader-ball ball2"></div>';
            strhtml = strhtml + '<div class="ball-loader-ball ball3"></div>';
            strhtml = strhtml + '</div>';
            strhtml = strhtml + '</div></div>';

            $('body').append(strhtml);
        },

        hide: function(){
            $('body').find('#_gFnLoadingUi').remove();
        }
    }, // 220520 --

    gFnExLoadingUi: {
        show: function(){
            var strhtml = "";
            strhtml = strhtml + '<div id="_gFnExLoadingUi" class="pop_loading_basic">';
            strhtml = strhtml + '<div id="loading" class="loading_box">';
            strhtml = strhtml + '<div class="mask_box">';
            strhtml = strhtml + '</div>';
            strhtml = strhtml + '<div class="ball-loader">';
            strhtml = strhtml + '<div class="ball-loader-ball ball1"></div>';
            strhtml = strhtml + '<div class="ball-loader-ball ball2"></div>';
            strhtml = strhtml + '<div class="ball-loader-ball ball3"></div>';
            strhtml = strhtml + '</div>';
            strhtml = strhtml + '</div></div>';

            $('body').append(strhtml);
        },

        hide: function(){
            $('body').find('#_gFnExLoadingUi').remove();
        }
    }, // 220520 --

        // gra loading Bar -- 220526
    gFnGraLoadingUi: {
        show: function(){
            var strhtml = "";
            strhtml = strhtml + '<div id="_gFnGraLoadingUi" class="pop_loading_basic">';
            strhtml = strhtml + '<div id="loading" class="box_txt_guloading">';
            strhtml = strhtml + '<div class="box_txt_loading">';
            strhtml = strhtml + '<span>보험데이터</span><br />상세분석 중...';
            strhtml = strhtml + '</div>';
            strhtml = strhtml + '<p class="txt_guloading">정확한 진단을 위해<br />무결성 데이터를 통신하고 있습니다.</p>';
            strhtml = strhtml + '</div></div>';

            $('body').append(strhtml);
        },

        hide: function(){
            $('body').find('#_gFnGraLoadingUi').remove();
        }
    }, // 220526 --

    // Back NO Scroll
	gFnScrollDisable: {
        init : function(){
        	$('html, body').css('height','auto');
            $('html, body').addClass('scroll_lock');
        }
    },

	// Back Scroll
	gFnScrollAble: {
        init : function(){
        	$('html, body').css('height','100%');
            $('html, body').removeClass('scroll_lock');
        }
    },

    //////////////////////////////////////////////////////////////
    ///////////////// end static/js/ui_common.js /////////////////
    //////////////////////////////////////////////////////////////

	//////////////////////////////////////////////////////////////
    ///////////////////// start common_ui.js /////////////////////
    //////////////////////////////////////////////////////////////

	/**
	 * System Font Size
	 */
	gFnFontSize: {
		set: function(_size) {
			// 로그인체크 로직 필요
			localStorage.setItem('fontSize', _size)
		},

		get: function() {
			return localStorage.getItem('fontSize') || '0';
		}
	},

	/**
	 * 페이지 타이틀변경
	 */
	gFnSetTitle: function(title) {
		$('.header_title').text(title);
	},

	gFnValidation: {
		bind: function(_targetId, _callback) {


		},

		checkAll: function(_targetId) {

		},

		showErrMsg: function(_target, _errMsg, _isAlert) {

		},

		// number
		number: {
			bindEvent: function(obj, group) {
				this.input(obj);
				this.blur(obj, group);
			},

			input: function(obj) { // 입력받을수 있는 수와 정규식 체크

			},

			blur: function(obj, group) {

			},

			check: function(obj, showMsg = true) {

			}
		},

		name: { // 외국인의 경우도 있기에 글자를 제한하기 힘듦
			bindEvent: function(obj, group) {
				this.input(obj);
				this.blur(obj, group);
			},

			input: function(obj) { // 입력받을수 있는 수와 정규식 체크

			},

			blur: function(obj, group) {

			},

			check: function(obj, showMsg = true) {

			}
		},

		ssn1: { // 주민번호 앞자리
			bindEvent: function(obj, group) {
				this.input(obj);
				this.blur(obj, group);
			},

			input: function(obj) { // 입력받을수 있는 수와 정규식 체크

			},

			blur: function(obj, group) {

			},

			check: function(obj, showMsg = true) {

			}
		},

		ssn2: { // 주민번호 뒷자리
			bindEvent: function(obj, group) {
				this.input(obj);
				this.blur(obj, group);
			},

			input: function(obj) { // 입력받을수 있는 수와 정규식 체크

			},

			blur: function(obj, group) {

			},

			check: function(obj, showMsg = true) {

			}
		},

		date:{
			bindEvent: function(obj, group) {
				this.input(obj);
				this.blur(obj, group);
			},

			input: function(obj) { // 입력받을수 있는 수와 정규식 체크

			},

			blur: function(obj, group) {

			},

			check: function(obj, showMsg = true) {

			}
		},

		birth: { // 생년월일 8자리
			bindEvent: function(obj, group) {
				this.input(obj);
				this.blur(obj, group);
			},

			input: function(obj) { // 입력받을수 있는 수와 정규식 체크

			},

			blur: function(obj, group) {

			},

			check: function(obj, showMsg = true) {

			}
		},

		email: { // 이메일
			bindEvent: function(obj, group) {
				this.focus(obj);
				this.input(obj);
				this.change(obj, group);
				this.blur(obj, group);
			},

			focus: function(obj) {

			},

			input: function(obj) { // 입력받을수 있는 수와 정규식 체크

			},

			blur: function(obj, group) {

			},

			change: function(obj, group) {

			},

			check: function(obj, showMsg = true) {

			}
		},

		radio: {
			bindEvent: function(obj, group) {
				let _this = this;

				$(obj).find('input[type=radio]').each((idx, item) => {
					_this.click(item, group);
				});

			},

			click: function(obj, group) { // 입력받을수 있는 수와 정규식 체크

			},
			check: function(obj) {

			}
		},

		checkbox: {
			bindEvent: function(obj, group) {
				this.click(obj, group);
			},
			click: function(obj, group) { // 입력받을수 있는 수와 정규식 체크

			},
			check: function(obj) {

			}
		},

		multicheckbox: {
			bindEvent: function(obj, group) {
				this.click(obj, group);
			},
			click: function(obj, group) { // 입력받을수 있는 수와 정규식 체크

			},

			check: function(obj) {

			}
		},

		select: {
			bindEvent: function(obj, group) {
				this.change(obj, group);
			},
			change: function(obj, group) { // 입력받을수 있는 수와 정규식 체크

			},

			check: function(obj) {

			}
		},
		notnull: {
			bindEvent: function(obj, group) {
				this.blur(obj, group);
				this.focus(obj);
				this.input(obj);
			},

			focus: function(obj) {

			},

			blur: function(obj, group) {

			},

			input: function(obj) { // 입력받을수 있는 수와 정규식 체크

			},

			check: function(obj) {

			}
		},

		datepick: {
			bindEvent: function(obj, group) {
				//this.mouseout(obj, group);
				this.blur(obj, group);
				this.change(obj, group);
			},

			blur: function(obj, group) {

			},

			change: function(obj, group) { // 입력받을수 있는 수와 정규식 체크

			},

			check: function(obj) {

			}
		},

		customize: {
			bindEvent: function(obj, group) {
				let cstmObj = eval($(obj).data('vld-cstm-obj')) || {};
				cstmObj.bindEvent && cstmObj.bindEvent(obj, group);
			},
		}
	},

	/**
	 * 툴바 생성
	 */
	gFnCreateToolbar: function(menu) {
		if(!$('#toolbar').length) {
			return false;
		}
		let _menu = menu;
		let _template = `
			<div class="toolbar_content">
				<ul>
					<li class="home${_menu == 'home' ? ' on' : ''}">
						<a href="/app/cmn/mai/idx-cmnMaiBasi001m.do">
							<i class="ico" aria-hidden="true"></i>
							<span>홈</span>
						</a>
					</li>
					<li class="my-ins${_menu == 'my-ins' ? ' on' : ''}">
						<a href="javascript:void(0);">
							<i class="ico" aria-hidden="true"></i>
							<span>My보험</span>
						</a>
					</li>
					<li class="my-loan${_menu == 'my-loan' ? ' on' : ''}">
						<a href="javascript:void(0);">
							<i class="ico" aria-hidden="true"></i>
							<span>My대출</span>
						</a>
					</li>
					<li class="product${_menu == 'product' ? ' on' : ''}">
						<a href="javascript:void(0);">
							<i class="ico" aria-hidden="true"></i>
							<span>상품</span>
						</a>
					</li>
				</ul>
			</div>
		`;
		$('#toolbar').html(_template);
	}
};

$(document).ready(function(){
    gCommonUi.init();
});
