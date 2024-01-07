const mute_pics = ['mute_off.png','mute_on.png']
        let _main = document.getElementById('_main')
        let main_page = document.getElementById('main_page')
        let _holder = document.getElementById('holder')
        let sliders = document.querySelectorAll('#holder>div')
        let _nav = document.getElementById('nav')
        let start_btn = document.getElementById('btn1')
        let btns = document.querySelectorAll('#nav>ul>li>button')
        let _sounds =  document.querySelectorAll('#holder audio')
        let playnow = document.getElementById('playnow')
        let mute = document.getElementById('mute')
        let head_texts = document.querySelectorAll('.head_text')
        let count = 1
        let turn = 0
        _holder.style.height = (715*13)+'px'
        _main.style.overflow = 'hidden'
        main_page.style.height = 0
        sliders[0].style.top = 0
        sliders.forEach((val)=>{
            let _offsettop = val.offsetTop
            val.setAttribute('data-offsettop',_offsettop)
            
        })
        main_page.style.height = '714px'

        start_btn.addEventListener('click',(e)=>{
            _main.style.overflowY = 'scroll'
            main_page.style.transition = '2s'
            main_page.style.height = 0
            _sounds[0].play()
            _main.scrollTop = 5
            setTimeout(() => {
                _nav.style.display = 'flex'
            }, '1000');
            style_btns_and_texts(5)

            _main.addEventListener('scroll',(e)=>{
                let st = e.target.scrollTop
                let sh = e.target.scrollHeight
               
                _nav.style.display = 'flex'
                btn_reset()
                check_sliders(st)
                check_btns(st)
                style_btns_and_texts(st)
                check_music()    
            })
        })

        function style_btns_and_texts(st){
            console.log(turn);
            if(((st+100>(sliders[1].getAttribute('data-offsettop'))) && (st+100<(sliders[2].getAttribute('data-offsettop')))) || ((st+100>(sliders[3].getAttribute('data-offsettop'))) && (st+100<(sliders[4].getAttribute('data-offsettop')))) || ((st+100>(sliders[6].getAttribute('data-offsettop'))) && (st+100<(sliders[7].getAttribute('data-offsettop')))) || ((st+100>(sliders[10].getAttribute('data-offsettop')))&&(st+100<(sliders[11].getAttribute('data-offsettop'))))){
                btns.forEach((c)=>{
                    c.parentElement.style.color = 'black'
                })
            
            }
            else{
                btns.forEach((c)=>{
                    c.parentElement.style.color = 'white'
                })
        
            }
            
            sliders.forEach((val,iii)=>{
                if(st+300>(val.getAttribute('data-offsettop'))){
                    btn_reset()
                    head_texts[iii].style.opacity ='1'
                    btns[iii].parentElement.style.scale = '1.3'
                    btns[iii].parentElement.style.fontWeight = 'bold' 
                }
            })
        }

        function btn_reset(){
            btns.forEach((j)=>{
                j.parentElement.style.scale ='1'
                j.parentElement.style.fontWeight = 'normal'
            })
            
        }

        function check_btns(st){
            btns.forEach((v ,indd)=>{
                v.addEventListener('click',(e)=>{
                    sliders.forEach((m)=>{
                        if(m.getAttribute('id') == (e.target.getAttribute('data-name'))){
                            turn = indd
                            _main.scrollTop = m.getAttribute('data-offsettop')
                        }
                        
                    })
                })
            })
        }

        function check_sliders(st){
            sliders.forEach((val ,ind)=>{
            
                if(st>(val.getAttribute('data-offsettop'))){
                    turn = ind
                    val.style.top = (st-(val.getAttribute('data-offsettop')))+'px'
                }
                else{
                    val.style.top = 0
                }
            })
        }

        function check_music(){
            _sounds.forEach((val)=>{
                val.pause()
            })
            if((mute.getAttribute('data-mute'))=='off'){
                _sounds[turn+1].play()
            }
        }

        mute.addEventListener('click',(e)=>{
            if((e.target.getAttribute('data-mute'))=='off'){
                mute.src = 'img/'+mute_pics[1]
                e.target.setAttribute('data-mute','on')
            }
            else{
                mute.src = 'img/'+mute_pics[0]
                e.target.setAttribute('data-mute','off')
            }
            check_music()
        })