from pyowm import OWM
import telebot

owm = OWM('2f805d1b2d76e6b7dc98d1baabf2c1ac')
mgr = owm.weather_manager()
bot = telebot.TeleBot("5020212688:AAF2DiiFC380RGCvOMn7kwDQT7LfpJWeB18", parse_mode=None)

@bot.message_handler(content_types=['text'])
def send_echo(message):
	observation = mgr.weather_at_place( message.text )
	w = observation.weather
	temp = w.temperature('celsius') ["temp"]

	answer = "Привет, Варюшка Гавнюшка! В городе " + message.text  + " температура " + str(temp) + "°C" + "\n\n"
	if temp > 20:
		answer += "Тут так клёёёвоооо, вот бы взять Леончика и умотать туда" + "\n"
	elif temp < 12:
		answer += "Надо бы накинуть курточку, и дурачка белого тоже одень" + "\n"
	elif temp < 5:
		answer += "К курточке накинь шапку" + "\n"
	elif temp < 1:
		answer += "Как ты тут живёшь?"
	else:
		answer += "Это чё ваще за город?"
	
	bot.send_message(message.chat.id, answer)

bot.polling( none_stop = True )
