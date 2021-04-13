#!/bin/zsh
cp $1 crop.png;
width=`convert crop.png -format "%w" info:`;

echo width: $width;

#the width of one row is equal to the total width divided by cols
col_width="$(( $width / ($2 * 1.0) ))"
echo col width: $col_width

#offset is equal to the provided offset * col_width
offset="$(($4*($col_width)))"
echo offset: $offset

#chop amount is the height of one col times the provided coefficient
chop_amount="$(($3*$col_width))"
echo chop_amount $chop_amount

for i in `seq "$(($2 - 1))" -1 0`;
do
  convert crop.png -chop "$(($chop_amount))"x0+"$((offset + col_width * i))"+0 crop.png; 
  echo convert crop.png -chop "$(($chop_amount))"x0+"$((offset + col_width * i))"+0 crop.png
done;
