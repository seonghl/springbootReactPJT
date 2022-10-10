/*common.util = {
	...common.util,*/
var gCommonUtil = {
	
	/**
	 * [Util공통] null, undefinded 체크
	 * @param checkVal
	 */
	 gFnIsNull: function(checkVal) {
		if (typeof checkVal == 'number') return false;
		if (typeof checkVal == 'undefined' || checkVal == null || checkVal.replace(/ /gi, "") == "") {
			// alert("입력값이 없습니다.")
			return true;
		} else {
			return false
		}
	},

	/**
	 * 날짜구하기
 	 * @param date 날짜
	 * @param ymd Y:년 M:월 D:일
	 * @param diff 차이
	 * 예시 : 2년전 = gCommonUtil.gFnGetCustomDate('2022-06-10', 'Y', -2);
	 */
	gFnGetCustomDate: function(date, ymd, diff){
		if(gCommonUtil.gFnChkDateVal(date)) {
			var d = new Date(date);
			var day =  '' + (d.getDate()+(ymd=='D'?diff:''));
			var month =  '' + ((d.getMonth()+1)+(ymd=='M'?diff:''));
			var year =  '' + (d.getFullYear()+(ymd=='Y'?diff:''));

			if (month.length < 2 ) {
				month = '0'+ month;
			}
			if(day.length < 2){
				day = '0'+ day;
			}
			return year + "-" + month + "-" + day;
		} else {
			return date;
		}

	},
	
	/**
	 *	setPagingNavi - 페이징 설정함수
	 *	id : 대상 obj id (_curPage, _totPage 필수)
	 *	sh : show/hide 대상 obj id
	 *	pageNavi : return 받은 pageNavi
	 *	EX) gCommonUtil.setPagingNavi("MtlBlbInq002m","MtlBlbInq002m_getLd",data.pageNavi);
	 */
	 setPagingNavi : function(id, sh, pageNavi) {
		if(pageNavi.currentPage < pageNavi.lastPage) {
			$("#"+id+"_curPage").text(pageNavi.currentPage);
			$("#"+id+"_totPage").text(pageNavi.lastPage);
			$("#currentPage").val(pageNavi.currentPage);
			$("#nextPage").val(pageNavi.nextPage);
			$("#"+sh).show();
		}else {
			$("#"+sh).hide();
		}
	},
}