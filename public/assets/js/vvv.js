new Vue({
        el: '#app',
        components: {
            'v-modal': httpVueLoader('/assets/components/modal/index.vue'),
            'vue-drag-resize': httpVueLoader('/assets/components/drag/index.vue'),
            'osi-svg': httpVueLoader('/assets/components/svg/osi.vue'),
            'v-mask': httpVueLoader('/assets/components/mask/index.vue'),
            'v-fence': httpVueLoader('/assets/components/fence/index.vue'),
            'game-puzzle': httpVueLoader('/assets/components/games/puzzle.vue'),
            'anchored-heading': {
              render: function (createElement) {
                return createElement(
                  'h' + this.level,   // 标签名称
                  this.$slots.default // 子节点数组
                )
              },
              props: {
                level: {
                  type: Number,
                  required: true
                }
              }
            }
        },
        provide() {
            return {
              injectData: {
                dockPosition: this.dockPosition,
                dockSize: this.dockSize,
                dockZoom: this.dockZoom,
                dockZoomState: this.dockZoomState,
                dockZoomAroundState: this.dockZoomAroundState,
                theme: this.theme,
                showDate: this.showDate,
                date: this.date,
                time: this.time,
                user: this.user,
              }
            };
        },
        data() {
            return {
                myName: 'osindex',
                github: '//github.com/osindex',
                loaded: false,
                overMask: false,
                dockPosition: getCookie('dockPosition', 'left'),
                dockSize: getCookie('dockSize', 60),
                dockZoomState: getCookie('dockZoomState', 1),
                dockZoomAroundState: getCookie('dockZoomAroundState', 0),
                dockZoom: getCookie('dockZoom', 1.5),
                theme: getCookie('theme', 'light'),
                showDate: getCookie('showDate', '1'), //
                date: getCookie('date', 'M月D日 ddd'),
                time: getCookie('time', 'HH:mm'),
                user: {
                    nickname: getCookie('nickname'),
                    email: getCookie('email'),
                },
                animeTarget: {},
                // tl - Top left
                // tm - Top middle
                // tr - Top right
                // mr - Middle right
                // br - Bottom right
                // bm - Bottom middle
                // bl - Bottom left
                // ml - Middle left
                body: {
                    width: 100,
                    height: 100,
                    top: 100,
                    left: 100
                },
                currentDate: dayjs(),
                doms: [],
                iframeActive: false,
                iframeUrl: null,
                isBrowser: null,
                'game-puzzle': false
            }
        },
        methods: {
            loadScript(src) {
                let scriptEle = document.createElement('script')
                scriptEle.src = src
                document.body.appendChild(scriptEle)
                // scriptEle.onload = () => {
                //  this.load = true
                // }
                return scriptEle
            },
            resize(newRect) {
                this.body.width = newRect.width;
                this.body.height = newRect.height;
                this.body.top = newRect.top;
                this.body.left = newRect.left;
            },
            animeEx() {
                anime({
                  targets: ['.blue', '.green'],
                  translateX: '13rem',
                  easing: 'easeOutCirc',
                  rotate: 180,
                  borderRadius: 8,
                  duration: 2000,
                  loop: true
                });
            },
            iframe(url = "http://www.baidu.com/") {
                this.iframeUrl = url
                this.iframeActive = true
            },
            browser(url = "http://www.baidu.com/") {
                // 外部浏览器
                if (!this.isBrowser) {
                    this.isBrowser = window.open(
                        url,
                        "",
                        "width=1000,height=600,left=500,top=300,menubar=no,toolbar=no,status=no,scrollbars=yes"
                      )
                } else {
                  this.isBrowser.close()
                  this.isBrowser = null
                }
            },
            removeDom(index, dom) {
                this.doms.splice(index, 1)
                if (dom.appIcon) {
                    this.$refs.Docker.querySelector(dom.appIcon).classList.remove('active')
                }
            },
            shake(el) {
                anime({
                    targets: el,
                    scale: 1,
                    rotate: [
                        {
                            value: -5,
                            duration: 50,
                            easing: 'easeInOutBounce'
                        },
                        {
                            value: 5,
                            duration: 50,
                            easing: 'easeInOutBounce'
                        },
                        {
                            value: 0,
                            duration: 25,
                            easing: 'easeInOutBounce'
                        }
                    ],
                    // loop: 2, //间隔时间太长 
                    // loopComplete: function(anim) {
                    //     console.log(anim)
                    //     // anime.remove(el) 移除无效
                    // }
                });
            },
            uniApp(name) {
                return this.doms.find(e=>e.ref === name)
            },
            openApp(name, exts = {}) {
                // {ref:'game-puzzle', padding: 1, component:'game-puzzle',w: 600, h: 400,bind: {src: 'http://localhost:10241/assets/image/light.jpg'} }
                const e = this.uniApp(name)
                if(e){
                    this.shake(this.$refs[e.ref][0].$el)
                }else{
                    this.doms.push({ref: name, w: 600, h: 400, padding: 1, ...exts })
                }
            },
            showHelp() {
                const params = {title: '帮助', component:'osi-svg',html:`<p>YoungFan</p><p>copyright@2020</p>`}
                this.openApp('help', params)
                // setTimeout(()=>{
                //     // params.title = '帮助222222'
                //     console.log(this.$refs['help'][0])
                //     this.$refs['help'][0].setTitle('帮助222222')
                // }, 3000)
            },
            openSetting(event) {
                const exts = {
                    padding: 0,
                    h: 500,
                    component: 'v-fence',
                    appIcon: '.PrefApp',
                    on: {
                        emit: (x)=>{
                            if (x.target.value) {
                                const kv = x.target.name.split('.')
                                if (kv.length > 1) {
                                    this.$set(this[kv[0]],kv[1], x.target.value)
                                    window.$cookies.set(kv[1], x.target.value)
                                    // 这个组件需要缓存
                                }else{
                                    this[x.target.name] = x.target.value
                                    window.$cookies.set(kv[0], x.target.value)
                                }
                            }
                        }
                    },
                    bind: {
                        tree:[
                            {title: '设置', icon: 'icon-macbook', list: `
                                <div class="options">
                                <label class="w200" for="theme">主题</label>
                                    <div class="input">
                                        <input name="theme" type="radio" value="light">浅色</input>
                                        <input name="theme" type="radio" value="dark">深色</input>
                                        <input name="theme" type="radio" value="auto">自动</input>
                                    </div>
                                </div>
                                <div class="divide"></div>
                                <div class="options">
                                    <label class="w200" for="showDate">在菜单栏中显示日期时间</label>
                                    <div class="input">
                                        <input name="showDate" type="radio" value="1">是</input>
                                        <input name="showDate" type="radio" value="0">否</input>
                                    </div>
                                </div>
                                <div class="divide"></div>
                                <div class="options">
                                    <label class="w200" for="date">日期格式</label>
                                    <div class="input">
                                        <select name="date">
                                            <option value="YYYY年MM月DD日">----年--月--日</option>
                                            <option value="YYYY年MM月DD日 ddd">----年--月--日 周-</option>
                                            <option value="YYYY年MM月DD日 dddd">----年--月--日 星期-</option>
                                            <option value="MM月DD日">--月--日</option>
                                            <option value="MM月DD日 ddd">--月--日 周-</option>
                                            <option value="MM月DD日 dddd">--月--日 星期-</option>
                                            <option value="M月D日">-月-日</option>
                                            <option value="M月D日 ddd">-月-日 周-</option>
                                            <option value="M月D日 dddd">-月-日 星期-</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="divide"></div>
                                <div class="options">
                                    <label class="w200" for="time">时间格式</label>
                                    <div class="input">
                                        <select name="time">
                                            <option value="HH:mm">--:--</option>
                                            <option value="H:mm">-:--</option>
                                            <option value="A H:mm">上午 -:--</option>
                                            <option value="HH:mm:ss">--:--:--</option>
                                            <option value="A HH:mm:ss">下午 --:--:--</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="divide"></div>
                                <div class="options">
                                    <label class="w200" for="nickname">个人昵称[留言自动填充]</label>
                                    <div class="input">
                                        <input class="form-input" name="user.nickname" type="text"></input>
                                    </div>
                                </div>
                                <div class="divide"></div>
                                <div class="options">
                                    <label class="w200" for="email">个人邮箱[留言自动填充]</label>
                                    <div class="input">
                                        <input class="form-input" name="user.email" type="email"></input>
                                    </div>
                                </div>
                                `
                            },
                            {title: 'Dock设置', icon: 'icon-ios-cog', list: `<div class="options">
                                <label for="dockPosition">位置</label>
                                    <div class="input">
                                        <input name="dockPosition" type="radio" value="left">左</input>
                                        <input name="dockPosition" type="radio" value="bottom">下</input>
                                        <input name="dockPosition" type="radio" value="right">右</input>
                                    </div>
                                </div>
                                <div class="divide"></div>
                                <div class="options">
                                <label for="dockSize">大小</label>
                                    <div class="input">
                                        <input name="dockSize" type="range" min="20" max="120" step="1" value="60"/>
                                    </div>
                                </div>
                                <div class="divide"></div>
                                <div class="options">
                                <label for="dockZoomState">缩放</label>
                                    <div class="input">
                                        <input name="dockZoomState" type="radio" value="1">启用</input>
                                        <input name="dockZoomState" type="radio" value="0">停用</input>
                                    </div>
                                </div>
                                <div class="options">
                                <label for="dockZoom">比例</label>
                                    <div class="input">
                                        <input name="dockZoom" type="range" min="0.8" max="1.5" step="0.1" value="1.2"/>
                                    </div>
                                </div>
                                <div class="options">
                                <label for="dockZoomAroundState">周边缩放</label>
                                    <div class="input">
                                        <input name="dockZoomAroundState" type="radio" value="1">启用(实验性能)</input>
                                        <input name="dockZoomAroundState" type="radio" value="0">停用(性能更好)</input>
                                    </div>
                                </div>
                                `
                            }
                        ]
                    }
                }
                event.target.classList.add('active')
                this.openApp('setting', exts)
            },
            openApps() {
                this.overMask = true
                console.log(this.overMask)
                // const e = this.doms.find(e=>e.ref === 'apps')
                // if(e){
                //     this.shake(this.$refs[e.ref][0].$el)
                // }else{
                //     this.doms.push({ref:'apps', padding: 1, component:'osi-svg',html:`<p>YoungFan</p><p>copyright@2020</p>`,w: 600, h: 400})
                //     // this.doms.push({ref:'help',padding: 1,html:'<h2>内容呢？</h2><p>一段话</p>'})
                // }
            },
            beforeClose(event) {
                console.log(event.params);
            },
            dockOver(event) {
                // console.log(this.$refs.Docker.children)
                if(event.target.classList.toString().indexOf('DockItem') === 0 && this.dockZoomState > 0){
                    const { clientX, clientY, target } = event
                    const defaultWidth = this.dockSize
                    // let imgScale = 1
                    // if (imgScale < 0.5) {
                    //     imgScale = 0.5;
                    //   }
                    // target.width = defaultWidth * 2 * imgScale
                    // target.style.transform = 'scaleX(1.5)'
                    const imgList = this.$refs.Docker.children
                    for (let i = 0; i < imgList.length; i++) {
                      const img = imgList[i];
                      const x = img.offsetLeft + defaultWidth / 2 - clientX;
                      const y =
                        img.offsetTop +
                        getOffset(target, this.dockPosition) +
                        img.offsetHeight / 2 -
                        clientY;
                      let imgScale
                      if (this.dockZoomAroundState > 0) {
                        imgScale =1 - Math.sqrt(x * x + y * y) / (imgList.length * defaultWidth);
                        if (imgScale < 0.5 || !imgScale) {
                          imgScale = 0.5
                        }
                        if (target == img) {
                            imgScale = this.dockZoom
                        } 
                      }else{
                        if (target == img) {
                          imgScale = this.dockZoom
                        } else {
                          imgScale = 0.5
                        }
                      }
                      // console.log(imgScale)
                      img.style.width = defaultWidth * 2 * imgScale + 'px';
                      img.style.height = defaultWidth * 2 * imgScale + 'px';
                    }
                }
            },
            dockLeave() {
                const imgList = this.$refs.Docker.children
                for (let i = 0; i < imgList.length; i++) {
                    imgList[i].style.width = this.dockSize + 'px'
                    imgList[i].style.height = this.dockSize + 'px'
                }
            },
        },
        computed: {
            now() {
                return this.currentDate.format(`${this.date} ${this.time}`.replace('  ',' '))
            },
            currentTimeTheme() {
                const hour = (new Date()).getHours()
                return hour > 7 && hour < 18 ? 'light' : 'dark'
            },
            showTheme() {
                // console.log(this.theme)
                return (this.theme && this.theme != 'auto') ? this.theme : this.currentTimeTheme
            },
            dockStyle() {
                if (this.loaded) {
                    this.dockLeave()
                }
                const zoom = `${parseInt(this.dockSize) + 14}px` // 固定14
                switch(this.dockPosition) {
                    case 'left':
                        return {marginLeft: 0, width: zoom}
                    break
                    case 'right':
                        return {marginRight: 0, width: zoom}
                    case 'bottom':
                        return {marginBottom: 0, height: zoom}
                }
            }
        },
        directives: {
            // v-cloak 也需要vue 加载完 使用[css]和指令隐藏特性即可
            style: {
                inserted: (el) => {
                    el.removeAttribute('style')
                }
            }
        },
        created() {
        },
        mounted() {
            this.loaded = true
            // this.$refs['vmd'].show()
            // this.$nextTick(()=>{
            //     this.$modal.show('vmd', { draggable: true, foo: 'bar' })
            // })
            //     // this.$refs['vmd'].show()
            // })
            // this.$modal.show('dialog', {
            //   title: 'Alert!',
            //   text: 'You are too awesome',
            //   buttons: [
            //     {
            //       title: 'Deal with it',
            //       handler: () => { alert('Woot!') }
            //     },
            //     {
            //       title: '',       // Button title
            //       default: true,    // Will be triggered by default if 'Enter' pressed.
            //       handler: () => {} // Button click handler
            //     },
            //     {
            //       title: 'Close'
            //     }
            //  ]
            // })
            window.setInterval(() => {
              this.currentDate = this.currentDate.add(1, 's')
            }, 1000)
            const puzzle = this.loadScript('//cdn.jsdelivr.net/npm/vue-8-puzzle') // 延迟加载
            // const puzzle = this.loadScript('//unpkg.com/vue-8-puzzle') // 延迟加载
            puzzle.onload = () => {
                 this['game-puzzle'] = true
            }
        }
    })