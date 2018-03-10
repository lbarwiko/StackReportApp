SELECT * FROM PREDICTION_META
WHERE fund_id = ${fund_id}
ORDER BY date_predicted DESC
LIMIT ${limit} OFFSET ${offset}
