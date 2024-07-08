const pool = require("@/libs/dbConnect");

export async function GET() {
  try {
    const client = await pool.connect();
    console.log("database connected");

    const unitQuery = `
      SELECT * FROM cow_units WHERE doctrine = 'Pan-Asian';
    `;
    const unitData = await client.query(unitQuery);
    // console.log(unitData.rows);

    const units = await Promise.all(
      unitData.rows.map(async (row: any) => {
        const unitId = row.cow_unit_id;

        const levelQuery = `SELECT * FROM cow_levels WHERE cow_unit_id = $1;`;
        const levelData = await client.query(levelQuery, [unitId]);

        const levelPromise = levelData.rows.map(async (level: any) => {
          const levelId = level.cow_level_id;

          const attackQuery = `SELECT * FROM cow_attack WHERE cow_level_id = $1;`;
          const defenseQuery = `SELECT * FROM cow_defense WHERE cow_level_id = $1;`;
          const costQuery = `SELECT * FROM cow_cost WHERE cow_level_id = $1;`;
          const upkeepQuery = `SELECT * FROM cow_upkeep WHERE cow_level_id = $1;`;

          const [attackData, defenseData, costData, upkeepData] =
            await Promise.all([
              client.query(attackQuery, [levelId]),
              client.query(defenseQuery, [levelId]),
              client.query(costQuery, [levelId]),
              client.query(upkeepQuery, [levelId]),
            ]);

          return {
            level: level,
            attackData: attackData.rows,
            defenseData: defenseData.rows,
            costData: costData.rows,
            upkeepData: upkeepData.rows,
          };
        });

        const levelResult = await Promise.all(levelPromise);
        // console.log("level: ", levelResult);

        return {
          id: row.cow_unit_id,
          name: row.name,
          category: row.category,
          levels: levelResult,
        };
      })
    );
    client.release();
    // console.log("Data: ", units);

    console.log("Success");
    return new Response(JSON.stringify(units));
  } catch (error: any) {
    console.log("Error Fetching Data: ", error.message);
    return new Response(error.message);
  }
}
