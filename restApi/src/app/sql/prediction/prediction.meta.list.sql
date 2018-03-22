SELECT * FROM PREDICTION_META 
ORDER BY date_predicted DESC, prediction_meta_id DESC
LIMIT ${limit} OFFSET ${offset}
