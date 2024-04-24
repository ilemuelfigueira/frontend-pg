import { twMerge } from "tailwind-merge"

export const CarrinhoSVG = ({
  className,
  fill = "white",
  stroke = "white"
}) => {
  return (
    <svg className={twMerge("w-7 aspect-square", className)} viewBox="0 0 26 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.37579 1.00173L1.3758 1.00174C1.46964 0.963101 1.61471 0.930784 1.69897 0.925166L1.70396 0.924834V0.925C1.71975 0.925 1.73724 0.929579 1.74743 0.932329C1.7609 0.935964 1.77748 0.94108 1.79648 0.947329C1.83462 0.959877 1.88569 0.978048 1.94743 1.00088C2.07108 1.0466 2.24 1.11192 2.43905 1.19058C2.83729 1.34796 3.3577 1.55933 3.88127 1.77555C4.40485 1.99178 4.9319 2.21298 5.34344 2.39003C5.54916 2.47854 5.7263 2.55614 5.85981 2.61662C5.99036 2.67576 6.0857 2.72137 6.122 2.74481L6.12205 2.74484C6.19043 2.78909 6.25054 2.83635 6.29729 2.90903C6.34351 2.9809 6.37262 3.07124 6.39216 3.19542C6.43076 3.44072 6.4356 3.84663 6.4356 4.56992V5.8502L6.74149 5.8921L6.74271 5.89227L6.74271 5.89228C6.93996 5.92263 11.0369 6.48614 15.8415 7.1464L15.8416 7.14641C18.7615 7.55013 20.9593 7.85865 22.4417 8.07324C23.1829 8.18052 23.7455 8.26436 24.1302 8.3249C24.3225 8.35516 24.4708 8.37966 24.5749 8.39839C24.6269 8.40774 24.6684 8.41577 24.6991 8.42243C24.7144 8.42576 24.7277 8.42888 24.7386 8.4318C24.7479 8.4343 24.7602 8.43788 24.7707 8.44289L24.7383 8.51055M1.37579 1.00173L23.5196 17.7934M1.37579 1.00173L1.37453 1.00228M1.37579 1.00173L1.37453 1.00228M24.7383 8.51055L24.7704 8.44277C24.8255 8.46883 24.8863 8.50925 24.9401 8.55228C24.9934 8.59493 25.0445 8.64394 25.0779 8.68933M24.7383 8.51055C24.6215 8.45469 21.6712 8.02813 15.8313 7.2207L24.779 16.5645C24.8582 16.407 24.9193 16.2947 24.9665 16.1768C25.1367 15.7508 25.1243 15.2518 25.1243 12.2887C25.1243 8.92188 25.1243 8.87617 25.0176 8.73398M24.7383 8.51055C24.8348 8.55625 24.9618 8.65781 25.0176 8.73398M25.0779 8.68933C25.0917 8.70773 25.107 8.72886 25.1206 8.75721C25.1341 8.78576 25.1445 8.81871 25.1529 8.86158C25.1692 8.9452 25.1793 9.07512 25.1859 9.29988C25.1993 9.75111 25.1993 10.6051 25.1993 12.2858V12.2887C25.1993 12.4891 25.1993 12.6783 25.1994 12.857C25.1999 14.3627 25.2001 15.1238 25.1635 15.579C25.1429 15.8355 25.1103 15.9995 25.0578 16.1471C25.0162 16.2643 24.9621 16.3703 24.8956 16.5006C24.8797 16.5316 24.8632 16.564 24.846 16.5982C24.7365 16.8169 24.5257 17.0775 24.2893 17.3087C24.0529 17.54 23.7835 17.7492 23.5525 17.8608M25.0779 8.68933C25.078 8.68943 25.078 8.68953 25.0781 8.68963L25.0176 8.73398M25.0779 8.68933C25.0778 8.68921 25.0777 8.6891 25.0776 8.68899L25.0176 8.73398M23.5525 17.8608C23.5524 17.8608 23.5523 17.8609 23.5522 17.8609L23.5196 17.7934M23.5525 17.8608C23.5526 17.8607 23.5526 17.8607 23.5527 17.8606L23.5196 17.7934M23.5525 17.8608C23.5206 17.8765 23.4908 17.8917 23.4621 17.9063C23.3425 17.9673 23.2418 18.0186 23.0873 18.0575C22.8972 18.1053 22.6255 18.1349 22.1228 18.1539C21.204 18.1888 19.4933 18.1886 16.0542 18.1883C15.7252 18.1883 15.3803 18.1883 15.0188 18.1883C14.6149 18.1883 14.2319 18.1883 13.8688 18.1884C10.5533 18.1887 8.88933 18.1888 7.99137 18.159C7.49383 18.1425 7.2259 18.1167 7.04071 18.075C6.88788 18.0406 6.79109 17.995 6.67559 17.9405C6.64948 17.9282 6.6224 17.9154 6.59351 17.9022L6.59267 17.9018L6.4321 17.8261M23.5196 17.7934C23.4315 17.8368 23.3625 17.8743 23.2912 17.9067C22.8121 18.1248 22.2285 18.1133 15.0188 18.1133C7.84183 18.1133 7.29293 18.125 6.83201 17.9294C6.76721 17.9019 6.70416 17.8703 6.62467 17.834L6.431 17.7426L6.4321 17.8261M6.4321 17.8261L6.44575 18.8638M6.4321 17.8261L6.35662 17.7905L6.37076 18.8648M6.44575 18.8638L7.26451 21.0484C6.98013 20.9215 6.6399 20.5762 6.50787 20.2816C6.39107 20.0328 6.38599 19.9516 6.37076 18.8648M6.44575 18.8638L6.37076 18.8648M6.44575 18.8638L23.545 26.1215M6.44575 18.8638C6.44575 18.8638 6.44575 18.8638 6.44575 18.8639M6.44575 18.8638L6.44575 18.8639M6.37076 18.8648L6.44575 18.8639M6.44575 18.8639C6.45339 19.4088 6.45848 19.6969 6.47589 19.8804C6.49273 20.0577 6.52043 20.1319 6.57576 20.2498L6.57632 20.251C6.63762 20.3877 6.74956 20.5405 6.88246 20.6752C7.01548 20.8101 7.16413 20.9215 7.29508 20.98L7.29645 20.9806C7.3251 20.9941 7.38326 21.0094 7.57188 21.0218C7.75732 21.0339 8.05899 21.043 8.56559 21.0503C9.57817 21.0648 11.4032 21.0725 14.7398 21.0852L22.0269 21.1105C22.0353 21.1106 22.0437 21.112 22.0516 21.1148L22.3817 21.2316L22.3821 21.2318C23.6639 21.6937 24.4629 22.7817 24.4629 24.0801C24.4629 24.9023 24.1859 25.5762 23.5986 26.1739M23.5986 26.1739L23.545 26.1215M23.5986 26.1739C23.5986 26.174 23.5985 26.174 23.5985 26.1741L23.545 26.1215M23.5986 26.1739C22.4317 27.3668 20.5554 27.3669 19.3884 26.1741M23.545 26.1215C22.4075 27.2844 20.5794 27.2844 19.4419 26.1215M19.3884 26.1741C19.3885 26.1742 19.3885 26.1742 19.3886 26.1743L19.4419 26.1215M19.3884 26.1741C18.8062 25.5866 18.5239 24.9026 18.5239 24.1055C18.5239 23.6658 18.6267 23.1608 18.7859 22.8527M19.3884 26.1741C19.3884 26.1741 19.3883 26.174 19.3882 26.1739L19.4419 26.1215M19.4419 26.1215L18.7859 22.8527M18.7859 22.8527C18.7859 22.8529 18.7858 22.853 18.7857 22.8532L18.8528 22.8867L18.7862 22.8523C18.7861 22.8524 18.786 22.8526 18.7859 22.8527ZM1.37453 1.00228C0.865858 1.2227 0.762199 1.90249 1.1696 2.28302C1.18724 2.30027 1.21493 2.31837 1.2443 2.33585C1.27648 2.35501 1.31802 2.37762 1.36767 2.40323C1.4671 2.45452 1.60202 2.51932 1.76592 2.59474C2.09388 2.74567 2.54035 2.94027 3.05625 3.15629L3.05634 3.15633M1.37453 1.00228L3.05634 3.15633M3.05634 3.15633C3.53089 3.35427 3.96986 3.54077 4.29455 3.68092C4.45692 3.75101 4.59055 3.80943 4.68569 3.85186C4.73331 3.8731 4.771 3.89021 4.79773 3.90271C4.8037 3.9055 4.80904 3.90802 4.81376 3.91028C4.81536 3.92278 4.81705 3.93974 4.81875 3.96191C4.8234 4.02243 4.82771 4.1153 4.83163 4.24731C4.83946 4.51096 4.84564 4.92666 4.8504 5.54296C4.85992 6.77534 4.86373 8.80758 4.86373 12.0246V20.1395C4.86373 20.1475 4.86503 20.1555 4.86758 20.1632M3.05634 3.15633L4.86758 20.1632M4.86758 20.1632L5.01484 20.605L5.015 20.6054M4.86758 20.1632L5.015 20.6054M5.015 20.6054C5.09754 20.8479 5.25257 21.1799 5.35941 21.3348L5.35956 21.335L5.015 20.6054ZM12.0237 26.2367L12.0235 26.2369C11.254 26.9648 10.273 27.2317 9.26684 26.9711C8.7108 26.8307 8.27738 26.5853 7.88179 26.1898C7.48616 25.7941 7.24081 25.3606 7.10044 24.8045C6.92878 24.1436 6.99571 23.4241 7.27875 22.8632C7.31417 22.7923 7.34683 22.7258 7.37054 22.6752C7.37404 22.6678 7.37731 22.6607 7.38035 22.6541C7.37936 22.6538 7.37837 22.6535 7.37736 22.6532C7.33089 22.6391 7.26642 22.6217 7.19615 22.6042C7.19594 22.6041 7.19574 22.6041 7.19554 22.604L7.21373 22.5313L12.0237 26.2367ZM12.0237 26.2367C12.57 25.7164 12.8774 25.0855 12.9605 24.317L12.0237 26.2367ZM18.9281 22.7281C18.9279 22.7287 18.9276 22.7293 18.9274 22.7298C18.9179 22.7292 18.904 22.7284 18.8855 22.7277C18.8741 22.7272 18.8611 22.7268 18.8467 22.7263C18.85 22.7191 18.8531 22.7123 18.856 22.7057C18.865 22.6856 18.8719 22.6694 18.8763 22.6577C18.8771 22.6557 18.8778 22.6539 18.8783 22.6523C18.8788 22.6524 18.8792 22.6524 18.8796 22.6524C18.8795 22.6541 18.8794 22.6561 18.8794 22.6582C18.8794 22.6977 18.9078 22.7171 18.9123 22.7202C18.9191 22.7247 18.9251 22.7271 18.9281 22.7281ZM12.5443 22.7078L12.5102 22.6328H12.5926L12.6267 22.7078H12.5443ZM12.7053 22.8809L12.6372 22.9121L12.7054 22.8811L12.7053 22.8809ZM23.2911 16.1785C23.159 16.3258 22.961 16.473 22.8036 16.5441L6.42154 7.39844C6.45709 7.39336 10.3571 7.92656 15.0848 8.57656L23.677 9.75977V12.6086C23.677 15.2019 23.6836 15.6501 23.4782 15.9559C23.429 16.0291 23.3676 16.0941 23.2911 16.1785ZM8.98349 7.81616C10.5539 8.03007 12.7107 8.32586 15.0746 8.65086L23.602 9.82515V12.6086C23.602 12.6862 23.602 12.7619 23.602 12.8357C23.6021 14.2931 23.6022 15.0171 23.558 15.4272C23.535 15.6409 23.5006 15.7615 23.4521 15.8536C23.4067 15.9399 23.3473 16.0052 23.2589 16.1024C23.2513 16.1107 23.2435 16.1193 23.2355 16.1281L23.2352 16.1285C23.1094 16.2688 22.9197 16.4094 22.7727 16.4758L22.7726 16.4758L22.5182 16.591H7.57052L7.30147 16.4661C7.30141 16.4661 7.30135 16.466 7.30129 16.466C6.98058 16.3153 6.69971 16.043 6.56057 15.7456L6.56032 15.745C6.53577 15.6936 6.51869 15.6554 6.50488 15.5652C6.49042 15.4707 6.48001 15.3211 6.47239 15.0484C6.45724 14.5063 6.45341 13.4921 6.44584 11.4919L6.44576 11.4709C6.44068 9.83558 6.44068 8.81802 6.44829 8.20934C6.4521 7.90472 6.4578 7.70388 6.46561 7.5796C6.46834 7.53617 6.47125 7.50338 6.47422 7.47941C6.50495 7.48314 6.5472 7.48846 6.6005 7.49533C6.7196 7.51067 6.89318 7.5336 7.1154 7.56331C7.5598 7.62273 8.1983 7.7092 8.98349 7.81616ZM10.4595 22.785L10.4607 22.7853C10.7345 22.875 11.0359 23.135 11.2117 23.4225C11.2709 23.5262 11.3003 23.5901 11.3169 23.6744C11.3343 23.7625 11.3383 23.8758 11.3383 24.0801C11.3383 24.3389 11.318 24.5103 11.2611 24.6543C11.2046 24.7972 11.1093 24.9203 10.9451 25.077L10.9449 25.0772C10.5452 25.4625 9.90827 25.5727 9.41431 25.3377L9.41296 25.3371C9.26671 25.2711 9.11452 25.1547 8.98355 25.0152C8.85268 24.8757 8.74711 24.7176 8.69043 24.5713C8.63721 24.4299 8.61558 24.2195 8.62734 24.0055C8.63911 23.7911 8.68365 23.5861 8.75276 23.4549L8.75314 23.4541C9.06067 22.8535 9.80331 22.5582 10.4595 22.785ZM22.0031 25.3698L22.0023 25.3701C21.0579 25.6946 20.1262 25.0514 20.1262 24.0801C20.1262 23.5258 20.4186 23.0643 20.9363 22.8174C21.0424 22.7681 21.1153 22.7421 21.1984 22.7284C21.283 22.7145 21.3817 22.7129 21.5407 22.7179C21.7801 22.7329 21.9767 22.7726 22.0961 22.8276C22.3173 22.9348 22.5167 23.1247 22.6609 23.3516C22.8053 23.5788 22.8911 23.838 22.8911 24.0801C22.8911 24.3412 22.7896 24.625 22.625 24.8647C22.4601 25.1047 22.2374 25.2925 22.0031 25.3698Z" fill={fill} stroke={stroke} strokeWidth="0.15" strokeLinejoin="round"/>
    </svg>
  )
}