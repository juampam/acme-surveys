


select title,description,question,answer,name
from surveys S,fields F, answers A, users U
where S.survey_id=F.survey_id and A.field_id=F.field_id and A.user_id = U.user_id
