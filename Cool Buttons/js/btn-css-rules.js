var rules = {
	btn1: [
	".btn1{position:relative;height: 2.3em;width: 7.3em;border: none;padding: 0.2em 0.1em;font-size: 2rem;cursor: pointer;outline: none;background: #1AAB8A;color: #fff;transition: 800ms ease background, 800ms ease color;}",
	".btn1:hover{background: #FFF;color: #1AAB8A;}",
	".btn1:before,.btn1:after{position:absolute;top: 0;right: 0;width: 0;height: 0.2rem;content:'';background: #1AAB8A;transition: 400ms ease all;}",
	".btn1:after{right: inherit;top: inherit;left: 0;bottom: 0;}",
	".btn1:hover:before, .btn1:hover:after{width: 100%;transition: 800ms ease all;}"
	],
	btn2_1: [
	"a.btn2_1{display: block;width: 12.9em;border-radius: 0.3em;padding: 1.43em 2.14em;font-size: 1.6rem;text-align: center;text-decoration: none;outline: none;-webkit-transition: all 0.3s cubic-bezier(0.390, 0.500, 0.150, 1.360);-moz-transition: all 0.3s cubic-bezier(0.390, 0.500, 0.150, 1.360);-ms-transition: all 0.3s cubic-bezier(0.390, 0.500, 0.150, 1.360);-o-transition: all 0.3s cubic-bezier(0.390, 0.500, 0.150, 1.360);transition: all 0.3s cubic-bezier(0.390, 0.500, 0.150, 1.360);}",
	"a.btn2_1{color: rgba(30, 22, 54, 0.6);box-shadow: rgba(30, 22, 54, 0.4) 0 0 0 0.14em inset;}",
	"a.btn2_1:hover{color: rgba(255, 255, 255, 0.85);box-shadow: rgba(30, 22, 54, 0.7) 0 0 0 2.85em inset;}"
	],
	btn2_2: [
	"a.btn2_2{display: block;width: 12.9em;border-radius: 0.3em;padding: 1.43em 2.14em;font-size: 1.6rem;text-align: center;text-decoration: none;outline: none;-webkit-transition: all 0.3s cubic-bezier(0.390, 0.500, 0.150, 1.360);-moz-transition: all 0.3s cubic-bezier(0.390, 0.500, 0.150, 1.360);-ms-transition: all 0.3s cubic-bezier(0.390, 0.500, 0.150, 1.360);-o-transition: all 0.3s cubic-bezier(0.390, 0.500, 0.150, 1.360);transition: all 0.3s cubic-bezier(0.390, 0.500, 0.150, 1.360);}",
	"a.btn2_2{color: rgba(30, 22, 54, 0.6);box-shadow: rgba(30, 22, 54, 0.4) 0 0 0 0.14em inset;}",
	"a.btn2_2:hover{color: rgba(255, 255, 255, 0.85);box-shadow: rgba(30, 22, 54, 0.7) 0 5.7em 0 0.14em inset;}"
	],
	btn3: [
	".btn3{position: relative;display: block; width: 18em;padding: 0;border: none;border-radius: 0.625em;font-size: 1.6rem;background-color: transparent;outline: none;overflow: hidden;z-index: 0;}",
	".btn3 > .txt1{position: relative; left: 0;margin: 0;width: 100%;padding: 0.5em 0em;text-align: center;color: white;background-color: #3D4C53;transition: all 0.3s ease;z-index: 1;}",
	".btn3 > .txt2{position: absolute;top: 0; left: 0;margin: 0;width: 33%;padding: 0.5em 0.1em;text-align: center; background-color: #26A69A;color: white;z-index: -1;}",
	".btn3:hover > .txt1{left: 33%;width: 67%;}"
	],
	btn4: [
	".btn4{font-size: 1.5rem;position: relative;width: 10em;height: 2.6em;border-radius: 0.2em;outline: none;}",
	".btn4 > .svg{width: 10em; height: 2.6em;}",
	".btn4 .shape{width: 10em; height: 2.6em;stroke-width: 0.6rem;fill: transparent;stroke: #009FFD;stroke-dasharray: 85 400;stroke-dashoffset: -220;transition: 1s all ease;}",
	".btn4 .txt{margin-top: -2.3em;text-align: center;}",
	".btn4 .txt a{color: black;text-decoration: none;font-weight: 100;font-size: 1.1em;}",
	".btn4 .spot{position: absolute;width: 100%;height: 100%;top: 0;left: 0;}",
	".btn4:hover .shape{stroke-dasharray: 50 0;stroke-width: 0.4em;stroke-dashoffset: 0;stroke: #06D6A0;}"
	],
	btn5_flip_to_top: [
	".btn5_flip_to_top{width: 12.5em;height: 5em;font-size: 1.8rem;outline: none;-webkit-transition: all 250ms ease;-moz-transition: all 250ms ease;-o-transition: all 250ms ease;transition: all 250ms ease;-webkit-transform-style: preserve-3d;-moz-transform-style: preserve-3d;-ms-transform-style: preserve-3d;-o-transform-style: preserve-3d;transform-style: preserve-3d;}",
	".default-state, .active-state{height: 5em;}",
	".default-state{-webkit-transform: translateZ(2.5em);-moz-transform: translateZ(2.5em);-ms-transform: translateZ(2.5em);-o-transform: translateZ(2.5em);transform: translateZ(2.5em);}",
	".btn5_flip_to_top .active-state{-webkit-transform: rotateX(90deg) translateZ(7.5em);-moz-transform: rotateX(90deg) translateZ(7.5em);-ms-transform: rotateX(90deg) translateZ(7.5em);-o-transform: rotateX(90deg) translateZ(7.5em);transform: rotateX(90deg) translateZ(7.5em);}",
	".btn5_flip_to_top:hover{-webkit-transform: rotateX(-89deg);-moz-transform: rotateX(-89deg);-ms-transform: rotateX(-89deg);-o-transform: rotateX(-89deg);transform: rotateX(-89deg);}",
	".default-state, .active-state{font-family: 'Montserrat', sans-serif;font-size: 1.8rem;font-weight: 400;line-height: 5em;text-align: center;color: #fff;background: #2ecc71;-webkit-transition: background 250ms ease;-moz-transition: background 250ms ease;-o-transition: background 250ms ease;transition: background 250ms ease;}",
	".btn5_flip_to_top:hover .default-state{background: #27af61;}",
	".active-state{background: #27af61;}"
	],
	btn5_flip_to_bottom: [
	".btn5_flip_to_bottom{width: 12.5em;height: 5em;font-size: 1.8rem;outline: none;-webkit-transition: all 250ms ease;-moz-transition: all 250ms ease;-o-transition: all 250ms ease;transition: all 250ms ease;-webkit-transform-style: preserve-3d;-moz-transform-style: preserve-3d;-ms-transform-style: preserve-3d;-o-transform-style: preserve-3d;transform-style: preserve-3d;}",
	".default-state, .active-state{height: 5em;}",
	".default-state{-webkit-transform: translateZ(2.5em);-moz-transform: translateZ(2.5em);-ms-transform: translateZ(2.5em);-o-transform: translateZ(2.5em);transform: translateZ(2.5em);}",
	".btn5_flip_to_bottom .active-state{-webkit-transform: rotateX(-90deg) translateZ(-2.5em);-moz-transform: rotateX(-90deg) translateZ(-2.5em);-ms-transform: rotateX(-90deg) translateZ(-2.5em);-o-transform: rotateX(-90deg) translateZ(-2.5em);transform: rotateX(-90deg) translateZ(-2.5em);}",
	".btn5_flip_to_bottom:hover{-webkit-transform: rotateX(89deg);-moz-transform: rotateX(89deg);-ms-transform: rotateX(89deg);-o-transform: rotateX(89deg);transform: rotateX(89deg);}",
	".default-state, .active-state{font-family: 'Montserrat', sans-serif;font-size: 1.8rem;font-weight: 400;line-height: 5em;text-align: center;color: #fff;background: #2ecc71;-webkit-transition: background 250ms ease;-moz-transition: background 250ms ease;-o-transition: background 250ms ease;transition: background 250ms ease;}",
	".btn5_flip_to_bottom:hover .default-state{background: #27af61;}",
	".active-state{background: #27af61;}"
	],
	btn6: [
	".btn6{position: relative;border: none;border-radius: 100%;width: 7.143em; height: 7.143em;font-size: 1.4rem;color: #FFFFFF;background-color: #E91E63;box-shadow: 0 0.143em 0.357em 0 rgba(0, 0, 0, 0.26), 0 0.143em 0.714em 0 rgba(0, 0, 0, 0.22);outline: none;-webkit-transition: all 0.4s;-moz-transition: all 0.4s;transition: all 0.4s;}",
	".btn6:hover{background: #d81558;box-shadow: 0 0.357em 0.786em 0 rgba(0, 0, 0, 0.28), 0 0.286em 1.071em 0 rgba(0, 0, 0, 0.25);}",
	".btn6 a{position: absolute;right: 60%; bottom: 30%;border-radius: 100%;width: 0%; height: 0%;padding-top: 27px;text-align: center;text-decoration: none;color: #FFFFFF;box-shadow: 0 0.143em 0.357em 0 rgba(0, 0, 0, 0.26), 0 0.143em 0.714em 0 rgba(0, 0, 0, 0.22);opacity: 0;}",
	".btn6 .btn6-1{background: #55acee;-webkit-transition: all 0.3s linear 0.3s;-o-transition: all 0.3s linear 0.3s;-moz-transition: all 0.3s linear 0.3s;transition: all 0.3s linear 0.3s;}",
	".btn6 .btn6-2{background: #dc4e41;-webkit-transition: all 0.3s linear 0.4s;-o-transition: all 0.3s linear 0.4s;-moz-transition: all 0.3s linear 0.4s;transition: all 0.3s linear 0.4s;}",
	".btn6 .btn6-3{background: #3F3F3F;-webkit-transition: all 0.3s linear 0.5s;-o-transition: all 0.3s linear 0.5s;-moz-transition: all 0.3s linear 0.5s;transition: all 0.3s linear 0.5s;}",
	".btn6:hover .btn6-1{right: 120%;bottom: 15%;width: 75%; height: 75%;opacity: 1;}",
	".btn6:hover .btn6-2{right: 95%;bottom: 105%;width: 75%; height: 75%;opacity: 1;}",
	".btn6:hover .btn6-3{right: 2%;bottom: 120%;width: 75%; height: 75%;opacity: 1;}"	
	],
	btn7: [
	".btn7{width: 212.1px;height: auto;margin: 7rem auto 0;text-align: center;background-color: transparent;-webkit-perspective: 700px;-moz-perspective: 700px;-ms-perspective: 700px;perspective: 700px;}",
	".btn7 > button{position: relative; top: 0;width: 100%; height: auto;padding: 0.6em 1.26em;border: 0;border-radius: 0.133em;font-size: 3rem;color: #fff;background: rgb( 22, 230, 137);box-shadow: 0 0 0 transparent;outline: none;cursor: pointer;-webkit-transform: translateZ(0);-moz-transform: translateZ(0);-ms-transform: translateZ(0);transform: translateZ(0);-webkit-transition: all 0.2s ease;-moz-transition: all 0.2s ease;-ms-transition: all 0.2s ease;transition: all 0.2s ease;}",
	".btn7:hover > button, .btn7 > button:focus{top: -0.333em;box-shadow: 0 0.333em 0.333em rgba( 15, 165, 60, 0.2 );background: rgb( 20, 224, 133);-webkit-transform: rotateX(20deg);-moz-transform: rotateX(20deg);-ms-transform: rotateX(20deg);transform: rotateX(20deg);}",	
	],
	btn8: [
	".btn8{z-index: 1;width: 2.286em; height: 2.286em;border: none;border-radius: 50%;font-size: 3.5rem;line-height: 1.1em;color: #1a1a1a;background: #ed1c5b;outline: none;transition: box-shadow 400ms cubic-bezier(0.2, 0, 0.7, 1), transform 200ms cubic-bezier(0.2, 0, 0.7, 1);}",
	".btn8:hover{-webkit-transform: rotate(45deg);transform: rotate(45deg);box-shadow: 0 0 0.029em 0.429em rgba(138, 59, 88, 0.4), 0 0 0.029em 0.857em rgba(138, 59, 88, 0.1), 0 0 0.029em 1.286em rgba(138, 59, 88, 0.1);}"
	],
	form1: [
	".form1{display: block;width: 50%;padding: 0.375em 0.75em;font-size: 1.6rem;line-height: 1.5em;color: #495057;cursor: text;background-color: #fff;border: 1px solid #ced4da;border-radius: 0.25em;transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;}",
	".form1:focus{color: #495057;background-color: #fff;border-color: #80bdff;outline: 0;box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);}"
	],
	btn9: [
	".btn9{display: block;padding: 1.5rem 0;border: 1px solid #F4F6Fb !important;border-radius: 6px !important;width: 20rem;font-family: 'Roboto',sans-serif;font-size: 2rem;text-align: center;word-wrap: break-word;text-decoration: none;color: #007BFF;background-color: transparent;background-clip: border-box;box-shadow: 0 0 3px 1px rgba(2,39,119,0.17);cursor: pointer;transition: 0.3s all ease;}",
	".btn9:hover, .btn9:focus{box-shadow: 0 9px 30px 0 rgba(2,39,119,0.17);}"
	],
	btn10: [
	".btn10{display: inline-flex;flex-flow: column wrap;position: relative;align-items: center;font-size: 6rem;font-family: 'Tahoma';font-weight: bold;color: #FF2C75;background-color: #02001F;}",
	".text_1, .text_2{background-color: #02001F;transition: transform 0.3s ease, color 0.3s ease;}",
	".text_2{position: absolute; overflow: hidden;height: 50%; padding: 0 10px;}",
	".line_through{position: absolute; border-bottom: 0.075em solid #FF2C75; top: 48%; width: 10%; transform: scaleX(0); opacity: 0;transition: transform 0.8s ease, opacity 0.2s ease}",
	".btn10:hover > .text_1{transform: skewX(12deg) translateX(-0.12em); color: #FFD1E1;}",
	".btn10:hover > .text_2{transform: skewX(12deg); color: #FFD1E1;}",
	".btn10:hover > .line_through{transform: scaleX(11); opacity: 1;}"
	],
};

function CodeGenerator(name){
	var clip = document.getElementById('clip');

	var html = document.createElement('div');
	$(html).html( $('.'+name).closest('.btn-container').html() );
	$(html).children().not('.'+name).remove();
	html = $(html).html().replace(/\s{2,}/g, '\n');

	var css = rules[name].toString();
	css = css.replace(/{/g, '{\n');
	css = css.replace(/;/g, ';\n');
	css = css.replace(/},/g, '}\n\n');

	$(clip).text(function(n, orgText){
		return '##### HTML #####\n\n'+html+'\n\n##### CSS #####\n\n'+css;
	});

	clip.select();
	document.execCommand('copy');
}

