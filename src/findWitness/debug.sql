--  select witness.id, (point(witness.longitude, witness.latitude) <@> point(halfUser.longitude, halfUser.latitude)) / 0.62137 distance, witness.witness_radius, *
  select witness.id, distance (witness, halfUser) < witness.witness_radius as cover, round(distance (witness, halfUser)), witness.witness_radius, *
  from
    users witness,
    users halfUser
  where
    witness.is_witness
    and witness.id != halfUser.id
    and halfUser.id= 38
  order by
    witness.witness_radius ASC

