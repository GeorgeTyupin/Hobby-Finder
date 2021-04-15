import os
DATA_DST = os.path.join(os.getcwd() , 'app/database/database.db')
print(os.getcwd())

from . import database
from . import auth
from . import reg
from . import workingWithAds