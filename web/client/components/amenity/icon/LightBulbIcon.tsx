import React from 'react'
import { SvgIcon, SvgIconProps } from '@material-ui/core'

export default function LightBulbIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M14.2512 20.9704V21.6723C14.2519 21.9385 14.157 22.1962 13.9838 22.3984C13.8106 22.6006 13.5705 22.7339 13.3073 22.7742L13.1354 23.4121C13.0892 23.5801 12.9894 23.7285 12.8511 23.8346C12.7129 23.9408 12.5437 23.9988 12.3695 24H10.6557C10.4814 23.9988 10.3123 23.9408 10.174 23.8346C10.0358 23.7285 9.93595 23.5801 9.88976 23.4121L9.72178 22.7742C9.4577 22.7335 9.2169 22.5996 9.04302 22.3968C8.86913 22.1939 8.77366 21.9355 8.7739 21.6683V20.9664C8.77364 20.8775 8.79094 20.7895 8.82482 20.7074C8.85869 20.6253 8.90847 20.5507 8.97129 20.4878C9.0341 20.425 9.10872 20.3753 9.19085 20.3414C9.27297 20.3075 9.36098 20.2902 9.44982 20.2905H13.5733C13.7531 20.2915 13.9252 20.3636 14.0522 20.4909C14.1792 20.6182 14.2507 20.7906 14.2512 20.9704V20.9704ZM17.4268 11.5196C17.429 13.0513 16.8336 14.5236 15.767 15.623C14.9906 16.4307 14.4834 17.459 14.3152 18.5667C14.2785 18.7968 14.1608 19.0063 13.9834 19.1573C13.8059 19.3084 13.5804 19.3911 13.3473 19.3906H9.67979C9.44781 19.3919 9.22309 19.3098 9.04654 19.1593C8.87 19.0088 8.75337 18.7999 8.71791 18.5707C8.54515 17.4595 8.03481 16.4283 7.25609 15.617C6.58534 14.92 6.09591 14.069 5.83073 13.1387C5.56556 12.2084 5.53275 11.2272 5.73518 10.2813C5.93761 9.33532 6.3691 8.45351 6.99179 7.71321C7.61448 6.97291 8.40933 6.39674 9.30661 6.03525C10.2039 5.67376 11.1762 5.53801 12.1382 5.63989C13.1001 5.74178 14.0224 6.07819 14.8241 6.61962C15.6257 7.16105 16.2822 7.89094 16.736 8.74525C17.1898 9.59957 17.427 10.5522 17.4268 11.5196ZM12.1815 7.94001C12.1809 7.76356 12.1106 7.59449 11.9859 7.46972C11.8611 7.34495 11.692 7.27462 11.5156 7.27409C10.3846 7.27515 9.30029 7.72489 8.50059 8.52459C7.70089 9.32429 7.25115 10.4086 7.25009 11.5396C7.25009 11.7164 7.32036 11.8861 7.44543 12.0111C7.5705 12.1362 7.74013 12.2065 7.91701 12.2065C8.09389 12.2065 8.26352 12.1362 8.38859 12.0111C8.51366 11.8861 8.58393 11.7164 8.58393 11.5396C8.5834 11.154 8.65881 10.7722 8.80586 10.4158C8.9529 10.0595 9.1687 9.73555 9.44092 9.46258C9.71315 9.18961 10.0365 8.97293 10.3924 8.82492C10.7484 8.6769 11.13 8.60045 11.5156 8.59993C11.6913 8.60046 11.8601 8.53129 11.9849 8.40759C12.1097 8.28389 12.1804 8.11574 12.1815 7.94001V7.94001ZM11.5156 3.66854C11.692 3.66801 11.8611 3.59769 11.9859 3.47292C12.1106 3.34815 12.1809 3.17907 12.1815 3.00262V0.666917C12.1815 0.490039 12.1112 0.320406 11.9861 0.195335C11.8611 0.0702642 11.6914 0 11.5146 0C11.3377 0 11.1681 0.0702642 11.043 0.195335C10.9179 0.320406 10.8476 0.490039 10.8476 0.666917V3.00062C10.8474 3.0885 10.8645 3.17557 10.8979 3.25684C10.9314 3.33811 10.9805 3.41197 11.0426 3.47421C11.1046 3.53644 11.1783 3.58582 11.2595 3.61951C11.3407 3.6532 11.4277 3.67054 11.5156 3.67054V3.66854ZM3.67054 11.5156C3.67001 11.3391 3.59968 11.17 3.47492 11.0453C3.35015 10.9205 3.18107 10.8502 3.00462 10.8496H0.666916C0.490039 10.8496 0.320405 10.9199 0.195334 11.045C0.0702627 11.1701 0 11.3397 0 11.5166C0 11.6934 0.0702627 11.8631 0.195334 11.9881C0.320405 12.1132 0.490039 12.1835 0.666916 12.1835H3.00062C3.08865 12.1843 3.17596 12.1676 3.25747 12.1343C3.33897 12.101 3.41305 12.0519 3.47539 11.9897C3.53773 11.9276 3.58709 11.8537 3.62059 11.7723C3.6541 11.6908 3.67107 11.6036 3.67054 11.5156V11.5156ZM22.3642 10.8496H20.0285C19.8516 10.8496 19.682 10.9199 19.5569 11.045C19.4318 11.1701 19.3616 11.3397 19.3616 11.5166C19.3616 11.6934 19.4318 11.8631 19.5569 11.9881C19.682 12.1132 19.8516 12.1835 20.0285 12.1835H22.3642C22.5411 12.1835 22.7107 12.1132 22.8358 11.9881C22.9609 11.8631 23.0311 11.6934 23.0311 11.5166C23.0311 11.3397 22.9609 11.1701 22.8358 11.045C22.7107 10.9199 22.5411 10.8496 22.3642 10.8496V10.8496ZM5.02837 17.0649L3.37458 18.7187C3.25808 18.8448 3.19479 19.011 3.19791 19.1826C3.20104 19.3543 3.27033 19.5181 3.39134 19.6399C3.51235 19.7617 3.67572 19.832 3.84735 19.8362C4.01899 19.8405 4.18561 19.7782 4.31246 19.6625L5.96625 17.9987C6.08275 17.8726 6.14604 17.7064 6.14292 17.5348C6.1398 17.3631 6.0705 17.1993 5.94949 17.0775C5.82848 16.9557 5.66511 16.8854 5.49348 16.8812C5.32185 16.8769 5.15522 16.9392 5.02837 17.0549V17.0649ZM17.5348 6.16223C17.6224 6.16146 17.7091 6.1434 17.7897 6.10908C17.8704 6.07477 17.9434 6.02487 18.0047 5.96225L19.6585 4.30846C19.7837 4.18329 19.854 4.01353 19.854 3.83652C19.854 3.65951 19.7837 3.48975 19.6585 3.36458C19.5334 3.23941 19.3636 3.16909 19.1866 3.16909C19.0096 3.16909 18.8398 3.23941 18.7147 3.36458L17.0609 5.01837C16.9985 5.08011 16.9489 5.15361 16.9151 5.23462C16.8813 5.31563 16.8639 5.40253 16.8639 5.49031C16.8639 5.57809 16.8813 5.665 16.9151 5.74601C16.9489 5.82702 16.9985 5.90052 17.0609 5.96225C17.1864 6.08859 17.3567 6.16043 17.5348 6.16223V6.16223ZM5.02837 5.96225C5.15522 6.07795 5.32185 6.14018 5.49348 6.13596C5.66511 6.13174 5.82848 6.0614 5.94949 5.93961C6.0705 5.81783 6.1398 5.65402 6.14292 5.48236C6.14604 5.31071 6.08275 5.14448 5.96625 5.01837L4.31246 3.36458C4.18729 3.23941 4.01753 3.16909 3.84052 3.16909C3.66351 3.16909 3.49375 3.23941 3.36858 3.36458C3.24341 3.48975 3.17309 3.65951 3.17309 3.83652C3.17309 4.01353 3.24341 4.18329 3.36858 4.30846L5.02837 5.96225ZM17.9987 17.0649C17.9404 16.9915 17.8673 16.9313 17.7841 16.8881C17.7009 16.845 17.6096 16.8199 17.516 16.8144C17.4225 16.809 17.3288 16.8234 17.2412 16.8566C17.1536 16.8899 17.074 16.9412 17.0076 17.0074C16.9412 17.0735 16.8895 17.1529 16.8559 17.2403C16.8222 17.3278 16.8075 17.4214 16.8125 17.515C16.8175 17.6085 16.8423 17.7 16.885 17.7834C16.9278 17.8667 16.9878 17.9401 17.0609 17.9987L18.7147 19.6525C18.8415 19.7682 19.0081 19.8305 19.1798 19.8262C19.3514 19.822 19.5148 19.7517 19.6358 19.6299C19.7568 19.5081 19.8261 19.3443 19.8292 19.1727C19.8323 19.001 19.769 18.8348 19.6525 18.7087L17.9987 17.0649Z" />
    </SvgIcon>
  )
}
