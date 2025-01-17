from flask import Flask, jsonify, request, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

port = os.environ.get('PORT', 8081)
db_url=os.environ.get('DB_URL')
# db_user = os.environ.get('DB_USER')
# db_password = os.environ.get('DB_PASSWORD')
app = Flask(__name__)
CORS(app)

#app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{db_user}:{db_password}@dpg-cu06925ds78s73d91ac0-a.oregon-postgres.render.com/backyardtally_db'
app.config['SQLALCHEMY_DATABASE_URI'] =  db_url # 'postgresql://benjman:0624@localhost:5432/backyardtally_db'

db = SQLAlchemy(app)


#User info
class User(db.Model):
    __tablename__ = 'users'
    __table_args__ = {"schema": "backyardtally"}
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)

    scores = db.relationship('UserScore', back_populates='user', cascade='all, delete-orphan')


    def to_dict(self):
        return {
        'id': self.id,
        'username': self.username
    }

    def __repr__(self):
        return f"<UserScore {self.username}"


#User Stats
class UserScore(db.Model):
    __tablename__ = 'user_scores'
    __table_args__ = {'schema': 'backyardtally'}
    id = db.Column(db.Integer, primary_key=True)
    user_id= db.Column(db.Integer, db.ForeignKey('backyardtally.users.id'), nullable=False)
    ppr = db.Column(db.Float, nullable=False)
    dpr = db.Column(db.Float, nullable=False)

    user = db.relationship('User', back_populates='scores')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'ppr': self.ppr,
            'dpr': self.dpr,
        }
with app.app_context():
    db.create_all()
   
@app.route('/', methods=['GET'])
def get_user_data():
    try:
        users = User.query.all()
        user_data = [user.to_dict() for user in users]

        return jsonify(user_data), 200
    except Exception as e:
        return jsonify({'message': 'Error fetching data', 'error': str(e)}), 500



#Creates
@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    try:
        
        username = data.get('username')
        password = data.get('password')
        #user = User.query.filter_by(username=username).first()

        new_user = User(username=username, password=password)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'DATA ADDED'})
    except Exception as e:
        return jsonify({'message': 'Error inserting', 'error': str(e)}), 500


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    try:
        
        username = data.get('username')
        password = data.get('password')
        #user = User.query.filter_by(username=username).first()

        user = User.query.filter_by(username=username ,password=password).first()
        if(user is None):
            return jsonify({'message': 'Login Failed'}), 401
        else:
            return jsonify({'message': 'LOGGED IN'})
    except Exception as e:
        return jsonify({'message': 'Error inserting', 'error': str(e)}), 500

@app.route('/userdb', methods=['POST'])
def create_user_stats():
    data = request.get_json()
    try:
        user_id = data.get('user_id')
        ppr = data.get('ppr')
        dpr = data.get('dpr')

        user_stats = UserScore(user_id=user_id, ppr=ppr, dpr=dpr)
        db.session.add(user_stats)
        db.session.commit()
        return jsonify({'MESSAGE': 'DATA ADDED'})
    except Exception as e:
        return jsonify({'message': 'ERROR INSERTING', 'error': str(e)}), 500

#User update
@app.route('/userdb', methods=['PUT'])
def update_user():
    data = request.get_json()
    user_id = data.get('user_id')
    ppr = data.get('ppr')
    dpr = data.get('dpr')

    try:
        user = User.query.filter_by(user_id=user_id).first()
        if user:
            user_id.ppr = ppr
            user_id.dpr = dpr
            db.session.commit()
            return jsonify({
                'success': True,
                'message': 'USER UPDATED',
            }), 200
        else:
            return jsonify({"success": False, "message": "User not found"}), 404
    except Exception as e:
        return jsonify({'message': 'ERROR UPDATING'}), 500
    
@app.route('/StatsBoard/users/<user_id>', methods=['GET'])
def stats_board(username):
    try:
        user_id = UserScore.query.filter_by(username=username).first()
        user_id.user.username
        return render_template('stats_board_template.html', data=[username])
    except Exception as e:
        return jsonify({'message': 'ERROR FETCHING STATS', 'error': str(e)}),500

    
@app.route('/StatsBoard/users', methods=['GET'])
def list_users():
    try:
        users = User.query.all()
        
        return render_template('users_dropdown.html', data=users)
    except Exception as e:
        return jsonify({'message': 'ERROR FETCHING STATS', 'error': str(e)}),500



if __name__ == '__main__':
    app.run(debug=True,port=port, host='0.0.0.0')

