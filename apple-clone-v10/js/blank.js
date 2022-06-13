//즉시 호출 함수 
(() => {

    let yOffset = 0; // window.pageYOffset 대신 쓸 변수
    let prevScrollHT = 0; //현재 스크롤 위치(yOffset)값 보다 이전 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentScene  = 0; // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)
    const scroll_wrap = document.querySelector('.scroll_wrap');

    //각 섹션값을 배열에 담아놓음
    const sceneInfo = [
        {
            //0
            type:'sticky',
            heightNum : 5, //브라우저 높이의 5배로 scrollHeight 세팅
            srcollHeight : 0,
            objs:{
                container : document.querySelector('#scroll-section-0')
            }
        },
        {
            //1
            type:'normal',
            heightNum : 5,
            srcollHeight : 0,
            objs:{
                container : document.querySelector('#scroll-section-1')
            }
        },
        {
            //2
            type:'sticky',
            heightNum : 5,
            srcollHeight : 0,
            objs:{
                container : document.querySelector('#scroll-section-2')
            }
        },
        {
            //3
            type:'sticky',
            heightNum : 5,
            srcollHeight : 0,
            objs:{
                container : document.querySelector('#scroll-section-3')
            }
        },
    ];

    //각 스크롤 섹션의 높이 세팅
    function setLayout(){
        for(let i = 0; i <sceneInfo.length; i++){
            sceneInfo[i].srcollHeight = sceneInfo[i].heightNum * window.innerHeight;
            sceneInfo[i].objs.container.style.height=`${sceneInfo[i].srcollHeight}px`;
        }
    }

    function scrollLoop(){
        prevScrollHT = 0;
        for(let i = 0; i < currentScene; i++){
            prevScrollHT +=  sceneInfo[i].srcollHeight;
        }
        // console.log(prevScrollHT);

        //현재 스크롤값 > 이전 스크롤 합
        if(yOffset > prevScrollHT + sceneInfo[currentScene].srcollHeight){
            currentScene++;
        }  
        if(yOffset < prevScrollHT ){
            if(currentScene === 0) return; // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)
            currentScene--;
        } 
        // console.log(currentScene);
        document.body.setAttribute('id',`show-scene-${currentScene}`);
    }
    
    window.addEventListener('resize',setLayout);

    window.addEventListener('scroll',()=>{
        yOffset = window.pageYOffset;
        scrollLoop();
    });

    setLayout();

})();