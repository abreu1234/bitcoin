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
var initial_val 		= 0.00000001; //valor inicial
var reset_current_val 	= 0.00000004; //Valor inicial quando for aumentar a aposta
var on_lose 			= 0.00000001; //Valor ao perder
var max_lose 			= 0.000005;
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
var $seq_count = 0;
var $max_seq_lose = 0;

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
	$seq_count = 0;
	if($interval != null)
	clearInterval($interval);
}

/**
 * Reseta todos os valores e reinicia o script
 */
function resetInit() {
	//reset();
	//$interval = setInterval(init, 1200);
	init();
	setTimeout(resetInit, (($i+1) * 1000) + (Math.round((Math.random() * 1000))) );
}

/**
 * Inicia o Script
 */
function init() {
	$seq++;
	//Caso tenha vencido
	if($win === true) {
		//Mantém o mesmo
		current_val=reset_current_val;
		$('#double_your_btc_stake').val(initial_val);
	//Caso tenha perdido
	}else {		
		//Caso perdeu 3 vezes seguidas
		if(current_val < max_lose) {
			//Muda aposta
			$('#double_your_btc_stake').val(current_val*=2);	
		}else {
			reset();
			console.log("TERMINOU\n MAIOR SEQUENCIA DE DERROTA: "+$max_seq_lose);
			return false;
		}
	}
		
	if($seq_count >= 3) {
		$seq_count = 0;
		bet('change');
	}else {
		bet('last');
	}
	$seq_count++;
	
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
	

	$('#double_your_btc_bet_'+$last+'_button').trigger('click');
}

/**
 * Verifica se ganhou ou perdeu
 */
function winLose() {
	$win = $('#double_your_btc_bet_win').is(":visible");
	if($win === true) {
		//if($i>=4)
		//	$seq = $max+1;

		console.log('GANHOU');
		$i=0;
		$t_win++;
	} else {
		$i++;
		$t_los++;
		if($i > $max_seq_lose)
			$max_seq_lose = $i;

		console.log('PERDEU '+$i);
	}
}

resetInit();