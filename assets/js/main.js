let renderer, scene, camera
let width = window.innerWidth, height = window.innerHeight, ratio = window.devicePixelRatio

const group = {
    globe: new THREE.Group()
}

init()
function init(){
    initThree()
    createObject()
    animate()

    window.addEventListener('resize', onWindowResize, false)
}

function initThree(){
    const canvas = document.querySelector('#canvas')

    scene = new THREE.Scene()

    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true, canvas: canvas})
    renderer.shadowMap.enabled = true
    renderer.setPixelRatio(ratio)
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 1.0)
    renderer.setClearAlpha(0.0)

    camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 10000)
    camera.position.z = 100
    scene.add(camera)
}

function createObject(){
    createGlobe()
}

function createGlobe(){
    const geometry = new THREE.Geometry()
    grid.forEach(_ => {
        const {lat, lon} = _
        
        for(let i = 0; i < 10; i++){
            // const x = Math.random() > 0.5 ? Math.random() * -1 - 1 : Math.random() * 1 + 1
            // const y = Math.random() > 0.5 ? Math.random() * -1 - 1 : Math.random() * 1 + 1
            const x = Math.random() * 4 - 2
            const y = Math.random() * 4 - 2
            const obj = util.toSphereCoordinates(lat + x, lon + y, 40)
            geometry.vertices.push(new THREE.Vector3(-obj.x, -obj.y, -obj.z))
        }
    })

    const material = new THREE.PointsMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 1.0,
        size: 0.2
    })

    const mesh = new THREE.Points(geometry, material)

    group.globe.add(mesh)

    scene.add(group.globe)
}

function onWindowResize(){
    width = window.innerWidth
    height = window.innerHeight

    camera.aspect = width / height
    camera.updateProjectionMatrix()

    renderer.setSize(width, height)
}

function render(){
    // group.globe.rotation.x += 0.005
    group.globe.rotation.y += 0.005

    camera.lookAt(scene.position)
    renderer.render(scene, camera)
}

function animate(){
    render()
    requestAnimationFrame(animate)
}