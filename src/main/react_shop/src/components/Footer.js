import React, {useEffect, useState} from 'react';

const Footer = () => {

    
    return(
        <>
            {/* // Alert Popup Tag */}
            <div class="center_pop_pos">
                <div class="comm_center_pop wrap_layer_popup" data-popup="alert_popup" role="dialog">
                    {/* inner_layer_pop */}
                    <div class="inner_layer_pop">
                        {/* pop_cont */}
                        <div class="pop_cont">
                            <div class="alert_bx" id="alertCont"></div>
                        </div>
                        {/* lay_bottom */}
                        <div class="lay_bottom">
                            <button type="button" popup-close="alert_popup" id="alertClose" class="btn_pop_bottom_enter">확인</button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* // Confirm Popup Tag */}
            <div class="center_pop_pos">
                <div class="comm_center_pop wrap_layer_popup" data-popup="confirm_popup" role="dialog">
                {/* inner_layer_pop */}
                    <div class="inner_layer_pop">
                        <div class="popTitle" tabindex="0"><p id="cfmTitle"></p></div>
                        <div class="pop_cont">
                            <div class="alert_bx" id="cfmContent" ></div>
                        </div>
                        {/* <!-- //pop_cont --> */}
                    <div class="lay_bottom btn_both">
                        <button type="button" popup-close="confirm_popup" id="cfmCancel" class="btn_pop_bottom_cancle"></button>
                        <button type="button" popup-close="confirm_popup" id="cfmEnter"  class="btn_pop_bottom_enter"></button>
                    </div>
                    <button type="button" popup-close="confirm_popup" id="cfmClose" class="btn_pop_close"><span class="obj_blind"></span></button>
                    {/* <!-- //inner_layer_pop --> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;


