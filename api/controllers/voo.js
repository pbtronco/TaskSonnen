import { db } from "../db.js";

export const getVoos = (_, res) => {
  const q = "SELECT * FROM voos";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addVoo = (req, res) => {
  const q = 
    "INSERT INTO voos(`cia_aerea`, `horario`, `valor`) VALUES(?)";

  const values = [
    req.body.cia_aerea,
    req.body.horario,
    req.body.valor,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Voo cadastrado com sucesso!");
  });
};

export const updateVoo = (req, res) => {
  const q =
  "UPDATE voos SET `cia_aerea` = ?, `horario` = ?, `valor` = ? WHERE `id` = ?";

  const values = [
    req.body.cia_aerea,
    req.body.horario,
    req.body.valor,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Voo atualizado com sucesso.");
  });
};

export const deleteVoo = (req, res) => {
  const q = "DELETE FROM voos WHERE `id`= ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Voo deletado com sucesso.");
  });
};