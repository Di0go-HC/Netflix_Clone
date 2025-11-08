import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.*;

public class JavaCalculadora extends JFrame implements ActionListener {

    private JTextField Tela;
    private double num1, num2, result;
    private char Operacao;

    public JavaCalculadora() {
        setTitle("Calculadora");
        setSize(500, 600);
        setLocationRelativeTo(null);
        setLayout(new BorderLayout());
        
        Tela = new JTextField();
        Tela.setFont(new Font("Arial", Font.BOLD, 35));
        Tela.setEditable(false);
        add(Tela, BorderLayout.NORTH);

        JPanel painel = new JPanel();
        painel.setLayout(new GridLayout(5, 4));

        String[] botoes = {
            "", "", "", "/",
            "7", "8", "9", "*",
            "4", "5", "6", "-",
            "1", "2", "3", "+",
            "C", "0", ".", "=",
        };

        for (String texto : botoes) {
            JButton botao = new JButton(texto);
            botao.setFont(new Font("Arial", Font.BOLD, 30));
            botao.addActionListener(this);
            painel.add(botao);
        }

        add(painel, BorderLayout.CENTER);
        setVisible(true);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    public static void main(String[] args) {
        new JavaCalculadora();
    }

    public void actionPerformed(ActionEvent e) {
        String comandoUsuario = e.getActionCommand();

        if (comandoUsuario.charAt(0) >= '0' && comandoUsuario.charAt(0) <= '9' || comandoUsuario.equals(".")) {
            Tela.setText(Tela.getText() + comandoUsuario);
        } else if (comandoUsuario.charAt(0) == 'C') {
            Tela.setText("");
            num1 = num2 = result = 0;
            Operacao = '\0';
        } else if (comandoUsuario.charAt(0) == '=') {
            num2 = Double.parseDouble(Tela.getText());
            switch (Operacao) {
                case '*':
                    result = num1 * num2;
                    break;
                case '/':
                    result = num1 / num2;
                    break;
                case '+':
                    result = num1 + num2;
                    break;
                case '-':
                    result = num1 - num2;
                    break;
            }
            Tela.setText(String.valueOf(result));
            num1 = result;
        } else {
            if (!Tela.getText().isEmpty()) {
                num1 = Double.parseDouble(Tela.getText());
                Operacao = comandoUsuario.charAt(0);
                Tela.setText("");
            }
        }
    }
}
