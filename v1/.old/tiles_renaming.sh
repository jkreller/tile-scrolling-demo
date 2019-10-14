count=1
for (( v = 1; v <= 11; v++ )); do
  for (( u = 1; u <= 22; u++ )); do
    newCount=$(printf "%02d" $count)
    newU=$(printf "%02d" $u)
    newV=$(printf "%02d" $v)
    mv img/tiles/world_${newCount}.png img/tiles/world_${newU}${newV}.png
    ((count++))
  done
done