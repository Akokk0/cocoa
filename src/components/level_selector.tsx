import Lv1Icon from "./icon/level/lv1"
import Lv2Icon from "./icon/level/lv2"
import Lv3Icon from "./icon/level/lv3"
import Lv4Icon from "./icon/level/lv4"
import Lv5Icon from "./icon/level/lv5"
import Lv6Icon from "./icon/level/lv6"

// Level Selector
const levelParser = (level: number) => {
    switch (level) {
        case 1: return <Lv1Icon />
        case 2: return <Lv2Icon />
        case 3: return <Lv3Icon />
        case 4: return <Lv4Icon />
        case 5: return <Lv5Icon />
        case 6: return <Lv6Icon />
    }
}

export default levelParser