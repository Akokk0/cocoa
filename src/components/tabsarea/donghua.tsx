import React, { useRef, useState } from 'react'
import './styles.css'
import Slide from './slide';

export default function Donghua() {
    
    const initItems = [{
        coverUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjeE20D8fkV1bdQKyoZ-YOmoyN_sa0lclAVGxkjrCpjV3o7lqWh0i1px0aNw&s',
        id: '1',
        title: '11111111',
        desc: "https://www.youtube.com/watch?v=NZ0e9v4Y8v8 画师大大：WolfyTheWitch 大大的主页：请有能力的朋友去支持大大！WolfyTheWitch - YouTube 大大的简介：heeeeeeeeeeey animatic woooo it's been a while i missed drawing you epic odysseus haha. Circe's eyes are different from my other god designs be"
    },
    {
        coverUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_Elb-XsewL8JOLEBYb98PXEEmYFfeVT33MwvJQKiTi6JVj7pdnIwVBOLww&s',
        id: '2',
        title: '222222222',
        desc: "Model：银狼——miHoYo/神帝宇 Motion：一粒毛豆梓/大神犬 MME：Ray/RedialC/三金络合物/ikeno/"
    },
    {
        coverUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFAh_XeIAKli9PtOldvm0iTWEdIyEdchppGR22elZ-WhZoqDtinfETB5LZXA&s',
        id: '3',
        title: '3333333333',
        desc: "来了来了来了！！！不好意思视频时间有点长了！！！不小心又重新定义了6点了。。。但是好饭不怕晚！！！希望大家看着马刀的视频度过一个愉快的周末！！！创作不易！！！喜欢的话就给个三连吧！！！谢谢谢谢！！！"
    },
    {
        coverUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG4h6Gmcu6BWx_-qtPKbrdJj3et9CpeFhkWe5K_tODkj2A9bFxicO546F6Vw&s',
        id: '4',
        title: '4444444444'
    },
    {
        coverUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgzF702fdexLhNcP-8Xcr8PAEPE19T52s9h4XhNQkZ-riHRM992B9a-uqw7A&s',
        id: '5',
        title: '5555555555'
    },
    {
        coverUrl: 'data:image/jpeg;base64,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',
        id: '6',
        title: '66666666666'
    },
    {
        coverUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBISEhIREhIRERERERERERERERIRDxARGBQZGRgUGBgcIS4lHB4rHxgYJjgnKy8xNTU2GiQ7QDs0Qi40NTEBDAwMEA8QGhISGjQhISMxMTQ0NDQ0NDQ0NDQ0NDE0MTQ0NDQ0NDQ0MTQxNDQ0NDY0NDQ0NDE0MTQ0MTQ0MTE0Mf/AABEIALcBEwMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAAAAgEDBAYFBwj/xABDEAACAQIEBAMEBgYHCQAAAAABAgADEQQSITEFQVFhBhMicYGRoRQyUnKx8AdCYpLB0RUjM1OCovEWJDRjc7LD0uH/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQIDBAX/xAAiEQEBAAICAwADAQEBAAAAAAAAAQIRAzESIUETUWEycSL/2gAMAwEAAhEDEQA/AO9URwJCiOJu54kCMBIEYQNIEm0BGEQFoWhGgaLSbQkwCLQkwgEWhaTCARaRaTCARaRaNFgBItJhAi2kERpEYIRIIjyDAEIikRyJBEArIikSwxTAtKyJFo5kShohEQiWmKRAtKWERllxErIglTlhLbQjGm8RxFEYSGhhGEURxAJEkSBJiM0ICEAmEIQMQhCAEiEIAQhCBCLCEAIQhACQZMiARIkyIyKZBjGKYBBimMZBgCGKY5i2gCmQYximURCIjCWGKRAtKrQjWhAm4RhIEkSVmEaKIwiM0JEmIzCTEjQCYSLwgEyISLxhMJF5EAIQhAhCEiATIhJUdSABqSdgIbGkSJifjFJTbI7r9vRb9wDymjDYinVXPScOoOUjZ0a17MORmePJjldStLx5Yzdi0yJYlJm2Fh1OgmhMMo39R+Al7RJtiMUz0SqjSw+AmWtTHKEyFxZzIMkyDKSgxTGimAKZBjGKYApimOYhlESEmECbBGEURhJUYRhFEYRGmTIkxGIQhACEIQAhCEAISIQAhCRAJkQkXjCZXi/7Kpb7NvdfWPF0a6m+VgVNgST2H85nnZ42Lwl8o5rHrZCeVr+7/SeF4ZxdZMSKia0zdK6jZ0JJNu4JzA9rbEz1PEZZaRopdalVvJTL9am7aFgegF2v+zNeDwFfDpdKdKpRH1kphlxKKBuoPpf2ek9LzzpLMtx3TVnt1ecrzuLaHcEdRHFWYMLiVen6GzBACpGzU21B/PaPnno4ZeWO3Fnj45aa2qSl6mkoet+f4TPUq7xpWNUAPaWTyq1QjtvMuK46tMBWOth7x1l4+0ZXxe8TEZx1nHVvFA5XmKv4mY7XlaZ+cd55g6yMwnztfEVS+s0p4mYbx+JebuiwiFx1nCVvEzctZnPiSpDQ8n0K8JwX+0xkw0PL+Po4jCII4MloYRhEEYRGaTIkxGmEiEAmEiEAISIQCZEJF4BMiVvUA5zJieIKvMRltuvGVeew6zHw0+YvmsbU7kKNi9jYn2X/AAM8nxPxzy0yJ+sLC257D+cx5OWY+p224uK5V61VywLU3BUGxyWuOo6GUYbFVHc5mQU150y2Zk0se2t79LbmfPPD9apTrVXzVAj0Kn9VTJCu9hlO4VcozG5/jNnh3iFVayU6dNKgqkK7OzWSnmLuwA5/jlE55lu+3XePUunc+VTfE5gDndGyswOb0MAVsw039/wlmGwApOzI9QIQS1MuWpZzqSoa5X2Aga7S/AVw9wVOZFtnyMFYX2BYA37fjEx1awMLpOrvTmvEHGFwLpX3p+aFrKNzTe4cjuLZ+5WdErg7EMLAgjVSCLgg+wifM/H2IzU1W97vf4Azd+jbj/m0/odRh5tAf1BJtnw4B9Gu7L/2j9ma8N1GfPN5T/juq1TLvztv+d5kqVxr+ffL8XS8xGXnbT+U5mpiCoyk7XGt+WhFpswjTjMZ3t+f4TkuKYnPUJ6AL7xv8yfhNXFMbbQH1H5DqfcZ4zNNMZ9Y8l+JLRS0rzwLR7Z6MXiFojNIBhsaNeQWilorNFtWjZoSq8IbGn3MGOpmVsQo5yUxS9YLbAZIMyjErG+kr1gNtQkzMuKWOMQIjXQlP0hYeeIGuheUfSBJSsDFsaW3is9oFhM+IfSLyVMasfEATy8dxULtM7s0zNSBOovJ8z/H/WDGcXqG9hYTPwZKuLrinc5R6qj8kQbn2nYdz7Z6b4TNoBcnQAcyZ7+EwSYOkUAAZ7Go+gzvbRL/AGRc/PrFlnqFOHd7Z/EGMWnS8unZVVcqjW2UC1r/AMZwVVjU9dQkm1lW59Ou097Hu1arkGqfXfkAoO/YE8vbK63DrglRrt0v2Mywkt8snTyXKY+OPpzwcIfSADYjS5Yg9+QnT+BatLzKrMyiqFARWO6G+dk73sD29pnhPwmox0FhfUcyZfT4G2539m02vjrU9OXGZ+Ut96fR3xqAfWE8TivEEyk3nh4bAulwzOw6FmInpYvgKkC2axANixO4nJnLj/XocVl/j5r4gxXmVDa5A1NuxnjcHqFMZhnBsUxWHN9f7xb7crfjOy8X8NWgqUaaDzKimpUa1ytO5C68rkN+6ZwiVGpulRfrIyOv30YMPwEvju4x5p/6fojMCLjUad9bX93KcV4rqClUB3LqxA5ZgQCT/lnv8M4ijUUrKWakyJmJvmamUFmNzrYFGPPQjfSU+JOGmqEvchWbI24IIF7fAGbY5evfxlljZfX183qVixLHUkkk9zCm99J0zeHNJVT8OWMq8kZfhyeD5cPLnS/0JGXgokXkP8Nco9I9IqoZ2X9DLE/oRYrmqcNcc6SsgTsm4EsrqcAFjDzP8VcbnHWTPUq8AfMbdekIeQ/E+oNhieclcKesdaksDzpc21Ywp6w+iHrLg8bPA1SYW3OWeRG8yT5kBKrOH7wNCOakjzIaOVmegeplQzLNzPKnEi47aY56UnFNK2xJO8sdJmamZlljfjXHPGmziAyysrK8PTao4VSQL+o9F6/ntJuNipZXu8LwgsajDqEB+bfnvPO43jCqlWN7iw1uB2M9PE4k00tfYABeSgbCcnjann1FXcM2o/ZGp+UjKrwn1bw+kETM+9Qhjvmy/qXPzt+1NyqCTqbenpr8pSGOx2BBB69o4qR9Du7XhB0jZRKPNh50WxpcwFp6zJcJ91PwE8B6uhnSINAew/CLKbgl1XCeLaBfGWIOR8GEBG11drj4Vfme8+U4rDPTJR1KuhKOOjrofz0IPOfeuOYAVAHF/MWzIAudja4BtzX1Op6hiLjccH4l4HWrA1XoVadfS/lIa1F1A0zAWYN3ANtrmGN8arOeWPo36OeIeZQfDsdaebLvcKfUp7N9ZQb6BFHKdTwjiKVKZpEp5+FJpOo0bJc5Gt0y5R0uGHKfLvDGJfCY5BUV0FQmmysrI2v1SMwG7ALfozdZ0fE8X9D4oj6CniKIRuhIvZvZqvu7Wvrr6x8uo7piIhnnfSjfSWisZjWzSYhmdq0q88wNszRWcTN50rapAmo1BFapMnmSC8ZVY7i50EJRnhDZOiRhLlYTCjy0PPQ083bYIwmVXlqtJPa8KJIQStWjh4KPkEMgih5OaBpyiQ1oj1LTNVxENFtcWvpFqUZmp1DeavMJgI83EiwOvIz1uB4cU0zMVvUAY30IH6o1+PvlNHCh6i5vq3uw6ga29824sZASNeg6fzmHLlq6dPHNxj43WBBUWvz2ng8Oo3qVGtogCje123+S/OaMUlVycqi5+0dL95Zw7gwS7Oc9RrZm2HsUchMJfbp1rFY1MxPKPQz16eEQcoxpLK3EaeSmFZug9pmmlw4Hclj0Ggmh7LrLOBE1Krvf+rRQlraPUJB09gH+cSd22SHrUtq/DcIpp66igkahNx2zX3/Cb6SZjc6jn37QqasFH3j+fjNCaEKNgfedtfz8prMZtlcr2wUiS9RwQVZgiWNxlQW0t3v847qbGFC2VQLaAbbbXjNtIU+f+MeFU66nOozDVXGjqeoInF+K6rVcFgq7f2tGpUw1Rv1i6j6x6ZihPvE+h+JVIvPn3GlJwGJB2TG0XHfOiqfwPxmmPSeSdV0/h3FCth6bkerIoN+eg/0909UCcx4GqXwy35XAH3WI/lOkNSY2e2uN9JZZWwg1SJ5kDFojmMXiM0AZbSdJVmlbPAq03WEw+Z7ZErRPbuZchMUNeWIZ3vLXJLlMpAjqIlRcGjAykGWKZJrVksYmaJmvBRXaZ3WO8qdo4k66S5T3lCNLc0KqL0bvExT1Muiip7GCOfc2nzioTGLzPLDHLtrjyZY9PPPEHp/XoVl/wFx+8lx84g4/TGhOU9G9J+c9ZHkVKWbmfjMrwfqtZz/uPPTj1P8AvF/eEV+PU/7xf3hNFXCTG9PIdh8BJvFZ9aY8uN+MWJ46rkIjBnZgiqGF2ZjZVHckgTvuG4QUaKUhuq3c/ac6u3xv8J4vh2lnqF/1aa3/AMbaL8gx+E6YDXsPhHhhr2nkz8vSugmpY/WY3PZeQ+QkM1jfvz0F79+fuMtHXrMTuQ3TV9yKYNrdbsd+X8petInus9CsAcnQsv7rEfwmljpOYxWKyYxaZNga1JlIvY50VWFzqbkk+2dI50nNv3Y6Lj1f25bxM2k4DxA1sFiR1qYS/wC83/qJ3viXWcDx/XC4xeiYV7fdxAX/AMk1wqOSel3gR/8Ad7b2epbtcg/n2Tpw15y/gEjyWH/Ma/w/0+E63STlBjfShhAWlxWVMhk6VtW5lLtLjeIVvAbVF4hJlzASp2EcK1XcwlXmeyEZbe9h3POb6ZE8ym5mpHM7682NykRwZjVzLEcydHtptHUypWjiI1haIxjKJJEDZnJiMJpdBKbQNCxw0CRKi8DX+aIhxCzOxvFaleAalxI5SwYkzGlMCXqAIG002vKsTRB1hntHw5NR0QjRnVT90nX5Xioj3eC4UUqS/ac52940+QE3D/7JMi+szalY/hPMZiGJ1W7nYU6YOZ+rXLbct56FU2Bnj1UIdjlNg6tcUqakhUG7u1uZ1Go2iqsXPcfqL9KpPcH1UHvmzCwqkXvz+rOtq6Th/Gt1qobn/h11JVjcVHO66DfadzX3b2n8Zz5d103rFyvHhcTgOJnOuJp2vnwddx7aT0nH4T6Bx4ekmfPGqXxtFOVali6J/wAdLT5gTTj7Ry9J/R+10qi+ocG3OxUWP4/AzsMk4DwFUKVqiMCCyICCLG4DaEGd1ULdIsu049LS1ovmygkmUnSQpqdxKWeUM5md6hjDWzSpxK1qGI7mOEfJIlWaEeydCpmlZ54ciWrUM7nnRuAlqTEjmaEeKnF7PaKKplYjXEDWrWktXlBQdZPljrAzmvKWqGPkAkWEAXzDLUW8oLASt8TbaBvRSkIOl9p5/wBNa0eniyZI23LSkmj3mQYsyTi+8DbBSmvhoC1af3vnYzx/pneRT4hldH+w6v7cpBtCnHdA79rxbyQRYkbEXB7SsPp7Jk1RiDsO88jF4cEk5Qbog/sEZrl72zO2W22hG+t+U34ip6b95hxVK7XKAjLUNzRpvaxHN2AF/n2tFV4+q5jx5lyUqlvVkroTdDcKwI0XT9Y9+s7Sobi/UXnE+PyBhEBvmD1ApHl2HoJdSF21y/DvOzLegfdH4Tny/wBVv8jlvEb+hp8o4zjGpYnD1UsWpesA7N6tVPYgEe+fTfFD2Uz5Nx5WNQNlYqEVc1jlvmbS/vEvD0nl6bPDOIH0zMq5EqNUKoDmyA3YLfsL6z6Eaulp824Hh6gqK6Ixy2YEKdr2PyvOzopUJ9RIHcwyRg3tUA5yvOCd5W1Ec2kZQJC04ioAJh8+/KbDl5gGZazvf0L8ICpud9ooe8ry1D9fQe2JnUGwjJbeEq98I9h7oriOuIhCeg8tLVSZC12EIQBxiGjeY/WRCI16O3WWeY3WEIKSGbrBz3hCI1Je0oerrCEAU15IrnlCEDBrNI8zqZEIGs8zvGQiEIG7bw9jhVohDfPTGRvZb0m/3be8TWzWvf8AOsITDLttj0zvsR2uPz74mJRWCtkD2vpkpsbMLG2YgDvvcC1tYQkrji/0hVS2Hpf9SoLEi4zU2OwAAHota52E7HD1M1KmetND8VBhCc+XbfH/ADHGeK6lgZ5PCtKCXAObO3xdv4WhCXj0Wfa16gG2g6DQStKkIQqTggxHYCEJJqKmMRd7/CZDxQbKJMIyqivj8ouwJ7cpgbidzosIQicuzfS36CEIRG//2Q==',
        id: '7',
        title: '777777777777'
    },
    {
        coverUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsIW8MDNUGL8wJZ2zsL6AuRCI78lr1YTjiUA&usqp=CAU',
        id: '8',
        title: '88888888888'
    },
    {
        coverUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_ENy58lE94vL4sKJxi22863djqbz4nMrf1Q&usqp=CAU',
        id: '9',
        title: '999999999999'
    },
    {
        coverUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTRSa1h8GN4Dpn2i4GETh1n196GiFJC8mLcQ&usqp=CAU',
        id: '10',
        title: '10000000000'
    }]

    return (
        <div className='fresh-home-categories-bangumi'>
            <div className='fresh-home-categories-bangumi-timeline'>
                <div className="fresh-home-categories-bangumi-timeline-header">
                    <div className="fresh-home-sub-header">
                        <div className="fresh-home-sub-header-dot">
                        </div>
                        有新动态
                    </div>
                </div>
                <Slide initItems={initItems}/>
                <Slide initItems={initItems}/>
            </div>
            <div className='fresh-home-categories-bangumi-rank-list'>
                <div className="fresh-home-sub-header">
                    <div className="fresh-home-sub-header-dot"></div>
                    排行榜
                </div>
                <div className='fresh-home-rank-list'>
                    <div className='fresh-home-rank-list-first-item animation'>
                        <a className='fresh-home-rank-list-cover'>
                            <img width={350} height={225} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjeE20D8fkV1bdQKyoZ-YOmoyN_sa0lclAVGxkjrCpjV3o7lqWh0i1px0aNw&s" alt="" />
                        </a>
                        <a className='fresh-home-rank-list-cover'>
                            <img width={350} height={225} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFAh_XeIAKli9PtOldvm0iTWEdIyEdchppGR22elZ-WhZoqDtinfETB5LZXA&s" alt="" />
                        </a>
                        <a className='fresh-home-rank-list-cover'>
                            <img width={350} height={225} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_Elb-XsewL8JOLEBYb98PXEEmYFfeVT33MwvJQKiTi6JVj7pdnIwVBOLww&s" alt="" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}