const log = console.log;
let x = 0
let bullet_y = 120;
let bullet_x;
let bullet_visible;
let bullet_move;
let bullet_flies;
let aim_y = 600;
let aim_x = 100;
let aim_size = 40;
let bullet_aim_y = 600;
let bullet_aim_x = 100;

const tank = document.querySelector('.tank')
const bullet = document.querySelector('.bullet')
const aim = document.querySelector('.aim')
const bullet_aim = document.querySelector('.bullet-aim')

let shot = document.querySelector('.shot')
let counter_shot = 0
shot.innerHTML = `Поcтрілів: ${counter_shot}`

let hit = document.querySelector('.hit')
let counter_hit = 0
hit.innerHTML = `Попадань: ${counter_hit}`
// Свойство innerWidth обєкта window отримуєм початкову ширину робочої області браузера
let inner_Width = window.innerWidth
let inner_Height = window.innerHeight


// Оброботчик события resize отримуєм поточну ширину робочої області браузера
window.addEventListener('resize', () => {
    inner_Width = window.innerWidth
})

// слухаэм клавіатуру
window.addEventListener('keydown', (e) => {
    if (e.key == 'ArrowLeft') {
        if (x > 0) { x += -10 }
    }
    if (e.key == 'ArrowRight') {
        if (x < (inner_Width - 128)) { x += 10 }
    }
    tank.style.left = x + 'px'
    if (e.code == 'Space') {
        // відвязуєм снаряд від танка
        if (bullet_y == 120) {
            bullet_x_start = x + 50
        }
        bullet_x = bullet_x_start
        bullet.style.left = bullet_x + 'px'
        bullet.style.display = 'block'
        bullet_move = true
    }
})

function aim_to_start() {
    aim_y = 600
    aim_x = 100
    aim_size = 40
}

function bullet_to_start() {
    bullet_y = 120
    bullet.style.bottom = bullet_y + 'px'
    bullet_move = false
    //Виводим кількість пострілів
    counter_shot = counter_shot + 1

    bullet.style.display = 'none'
    bullet.src = 'Bullet.png'
    bullet.style.width = '30px'
}
function shot_bullet_aim() {
    bullet_aim_y -= 10
    bullet_aim.style.bottom = bullet_aim_y + 'px'
    bullet_aim.style.left = bullet_aim_x + 'px'
    bullet_aim.style.display = 'block'

    if (bullet_aim_y < 0) {
        bullet_aim_y = aim_y
        aim_y -= 10
        bullet_aim.style.bottom = bullet_aim_y + 'px'
        bullet_aim_x = aim_x + aim_size / 2
        bullet_aim.style.left = bullet_aim_x + 'px'
        bullet_aim.style.display = 'block'
    }
}

setInterval(() => {
    // ++
    aim_y -= 4
    aim_x++
    aim_size += 1

    // spoil counter, spoil-bar
    //
    // bulet reaction - the same

    // Перевірка на зіткнення 
    if (aim_y < 70 && (x + 128 > aim_x && x < aim_x + aim_size)) {
        tank.classList.add('spoil')
        setTimeout(() => {
            tank.classList.remove('spoil')
        }, 500)
    }
    log(aim_x, aim_y)
    log(x)

    // Танк доїзжає bottom:0 починає рух з початку
    if (aim_y < 0) aim_to_start()

    // передати змінні для танку(цілі)
    aim.style.width = aim_size + 'px'
    aim.style.bottom = aim_y + 'px'
    aim.style.left = aim_x + 'px'

    if (bullet_move == true) {
        bullet_y += 20
        bullet.style.bottom = bullet_y + 'px'
        if (bullet_y > aim_y && (bullet_x > aim_x && bullet_x < aim_x + aim_size)) {
            bullet.src = 'Explosion.png'
            bullet.style.width = '100px'
            bullet_x -= 50
            bullet.style.left = bullet_x + 'px'
            bullet_move = false
            //Виводим кількість пострілів
            counter_shot = counter_shot + 1
            //Виводим кількість попадань
            counter_hit = counter_hit + 1
            hit.innerHTML = `Попадань: ${counter_hit}`
            setTimeout(() => {
                bullet_to_start()
                aim_to_start()

            }, 300)
        }
        if (bullet_y > inner_Height) {
            bullet_to_start()
        }
        //Виводим кількість пострілів
        shot.innerHTML = `Поcтрілів: ${counter_shot}`
    }
    shot_bullet_aim()
}, 100)

//dz обмежити вихід танка за межі 
// якшо куля вийшла за екран встановити її на вихідне положення і відмінити рух
// зробити пулю невидимою коли вона не литить



