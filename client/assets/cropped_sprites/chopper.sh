#!/bin/zsh
cp $1 crop.png;
height=`convert crop.png -format "%h" info:`;

echo height: $height

#the height of one row is equal to the total height divided by rows
row_height="$(( $height / ($2 * 1.0) ))"
echo row_height: $row_height

#offset is equal to the provided offset * row_height
offset="$(($4*($row_height)))"
echo offset: $offset

#chop amount is the height of one row times the provided coefficient
chop_amount="$(($3*$row_height))"
echo chop_amount $chop_amount

for i in `seq "$(($2 - 1))" -1 0`;
do
  convert crop.png -chop x$chop_amount+0+"$((offset + row_height * i))" crop.png; 
  echo convert crop.png -chop x$chop_amount+0+"$((offset + row_height * i))" crop.png; 
done;
