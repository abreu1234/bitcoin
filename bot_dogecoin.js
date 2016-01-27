/**
 * Copyright (c) Rafael Abreu
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Rafael Abreu (http://www.rafaelabreu.eti.br)
 * @link          http://www.rafaelabreu.eti.br
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */

//Variaveis de configuração
var initial_val = 0.009; //valor inicial
var reset_current_val = 0.01800000; //Valor inicial quando for aumentar a aposta
var on_lose = 0.009; //Valor ao perder
var max_lose = 1.15200000;
var $max = 50; //A quantidade de voltas que irá dar

//Não precisa alterar essas variávels
var current_val = reset_current_val;
var $win = true; 
var $i = 0;
var $last = 'hi';
var $seq = 0;
var $t_win = 0;
var $t_los = 0;
var $interval = null;

/**
 * Reseta todos os valores e para o script
 */
function reset() {
	$win = true;
	$last = 'hi';
	$i = 0;
	current_val = reset_current_val;
	$seq = 0;
	$t_win = 0;
	$t_los = 0;
	if($interval != null)
	clearInterval($interval);
}

/**
 * Reseta todos os valores e reinicia o script
 */
function resetInit() {
	reset();
	$interval = setInterval(init, 1000);
}

/**
 * Inicia o Script
 */
function init() {
	$seq++;
	//Verifica se a sequancia já acabou
	if($win === true && $seq > $max) {
		console.log('GANHOU: '+$t_win+' PERDEU: '+$t_los);
		//clearInterval($interval);
		setTimeout(resetInit, 5000);
		return false;
	}
	//Caso tenha vencido
	if($win === true) {
		//Mantém o mesmo
		current_val=reset_current_val;
		$('#double_your_doge_stake').val(initial_val);
		bet('last');
	//Caso tenha perdido
	}else {		
		//Caso perdeu 3 vezes seguidas
		if($i>=3) {
			if(current_val < max_lose) {
				//Muda aposta
				$('#double_your_doge_stake').val(current_val*=2);	
			}else {
				$('#double_your_doge_stake').val(current_val);
			}
		}else{
			$('#double_your_doge_stake').val(on_lose);
		}

		bet('change');
	}
	
	setTimeout(winLose, 750);
}

/**
 * Clica no botão de aposta de acordo com a regra
 */
function bet(type) {	
	if(type == 'change')
		if($last == 'hi')
			$last = 'lo';
		else
			$last = 'hi';
	

	$('#double_your_doge_bet_'+$last+'_button').trigger('click');
}

/**
 * Verifica se ganhou ou perdeu
 */
function winLose() {
	$win = $('#double_your_doge_bet_win').is(":visible");
	if($win === true) {
		if($i>=4)
			$seq = $max+1;

		console.log('GANHOU');
		$i=0;
		$t_win++;
	} else {
		$i++;
		$t_los++;
		console.log('PERDEU '+$i);
	}
}

resetInit();